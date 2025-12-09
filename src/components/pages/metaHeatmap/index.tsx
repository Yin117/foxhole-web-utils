"use client"

import React, { useRef, useEffect, useState, useMemo } from 'react';
import styles from './metaHeatmap.module.css';
import h337 from 'heatmap.js';
import { HeatmapConfiguration } from 'heatmap.js';
import useImage from 'use-image';
import Image from 'next/image';
import { hexInfo, HexKeys, HexKeysUnion, warNumbers, worldExtents } from '@/consts/foxhole';
import { warNumberToMetaMapDynamic } from '@/consts/warData/metaMapDynamic';
import { MetaMapDynamic } from '@/types/warData';
import { MenuItem, Slider, TextField, Typography } from '@mui/material';
import { getObjectEntries } from '@/helpers/typescriptHelper';

// 1. Define the TypeScript interface for a data point
interface HeatmapPoint {
  x: number;
  y: number;
  value: number;
}

// Configuration for the heatmap instance
const config: HeatmapConfiguration = {
  // Use the canvas element directly
  container: document.createElement('div'), // This will be replaced by the ref
  radius: 40,
  maxOpacity: 0.6,
  minOpacity: 0,
  blur: 0.85,
  // Define the color gradient
  gradient: {
    '.5': 'blue',
    '.8': 'yellow',
    '.95': 'red'
  }
};

function getRegionHeight(window: Window) {
  return window.innerHeight * 0.75;
}

function getWarNumberMenuItems(currentWar?: number) {
  return (
    warNumbers.map(wn => {
      return (
        <MenuItem
          key={wn}
          value={wn}
        >
          WC{wn}{wn === String(currentWar) ? ' (also Current War)' : ''}
        </MenuItem>
      )
    }).reverse()
  );
}

export function MetaHeatmap() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [regionHex, setRegionHex] = useState<HexKeysUnion>(HexKeys.SpeakingWoodsHex);
  const [startWarNumber, setStartWarNumber] = useState(warNumbers[warNumbers.length - 5]);
  const [endWarNumber, setEndWarNumber] = useState(warNumbers[warNumbers.length - 1]);
    
  // Ref to hold the canvas element where the heatmap will be drawn
  const hexImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Placeholder image URL
  const [image] = useImage(`/foxhole-web-utils/images/Maps/Map${regionHex}.png`);
  
  
  // State to hold the dimensions of the image/container once loaded
  const width = worldExtents.getWidthFromHeight(getRegionHeight(window));
  const height = getRegionHeight(window);

  const [structureValue, setStructureValue] = useState(0.3);
  const [max, setMax] = useState(1);

  const structureData = useMemo(() => {
    const mapDatas: MetaMapDynamic[] = [];

    for (const [warKey, data] of warNumberToMetaMapDynamic.entries()) {
      if (warKey.padStart(5, '0') < startWarNumber.padStart(5, '0') || endWarNumber.padStart(5, '0') < warKey.padStart(5, '0')) {
        // Skip as outside desired WC range
        continue;
      }
      for (const map of data) {
        if (map.mapName === regionHex) {
          mapDatas.push(map);
        }
      }
    }
    return mapDatas;
  }, [regionHex, startWarNumber, endWarNumber]);

  // 2. Generate Starter Density Data
  // Create an array of mock data points
  const heatmapData: HeatmapPoint[] = useMemo(() => {
    // We'll create two clusters of high-value points
    const points: HeatmapPoint[] = [];

    let overallMax = 0;
    // console.log(`Found ${structureData.length} maps to process`)
    for (const map of structureData) {
      let singleMapMax = 0;
      for (const platform of map.platforms) {
        singleMapMax++;
        points.push({
          x: Math.floor(width * platform.x),
          y: Math.floor(height * platform.y),
          value: structureValue,
        })
      }
      if (overallMax < singleMapMax) {
        overallMax = singleMapMax;
      }
    }
    // console.log(`Total of ${points.length} Structures Found, with an Overall Max of ${overallMax}`);

    return points;
  }, [width, height, structureData, structureValue]);
  // console.log('starterData', heatmapData);

  const heatmapDataLen = heatmapData.length;
  // 3. Effect Hook to Initialize and Render the Heatmap
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!isClient || typeof window === 'undefined') {
      return;
    }

    // A small hack: heatmap.js takes a container element, not the canvas itself.
    // We'll create the instance and then manually insert its canvas into our ref'd canvas parent.
    // Ensure the container is what we want to use for dimensions
    config.container = canvas.parentElement as HTMLElement;
    
    // Create the heatmap instance
    const heatmapInstance = h337.create(config);

    // Get the maximum value from the data for scaling the heatmap colors
    // const max = 10; // Math.max(...heatmapData.map(p => p.value));
    // const max = heatmapData.reduce((ac, cur) => {
    //   if (ac < cur.length) {
    //     return cur;
    //   }
    //   return ac;
    // }, 0);

    // Set the data, including the max value
    heatmapInstance.setData({
      min: 0,
      max: max,
      data: heatmapData,
    });

    // Cleanup function to avoid memory leaks
    return () => {
      // While h337 doesn't have a direct 'destroy', removing the canvas is the common cleanup
      // Check if the heatmap's canvas element exists and remove it
      const heatmapCanvas = canvas.parentElement?.querySelector('.heatmap-canvas');
      if (heatmapCanvas) {
          heatmapCanvas.remove();
      }
    };  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, heatmapDataLen, max, structureValue]); // Re-run if starterData changes

  if (!isClient || typeof window === 'undefined') {
    return <Typography>Loading...</Typography>;
  }

  // 4. Render the Container and Overlay Elements
  return (
    <div id="components-pages-resourcesCompare" className={styles.page}>
      <div className={styles.container}>
        <div
          style={{ 
            position: 'relative', 
            width, 
            height,
            // Set a background color for clarity if the image fails to load
            backgroundColor: '#eee',
            overflow: 'hidden'
          }}
        >
          {/* 4a. The base image element */}
          {image != null &&
          <Image
            ref={hexImageRef as unknown as React.RefObject<HTMLImageElement>}
            src={image.src}
            alt="Background for Heatmap"
            width={width}
            height={height}
            // Update dimensions on load to ensure canvas matches the image size
          />}
          {/* 4b. The canvas overlay where heatmap.js will render the density plot */}
          {/* heatmap.js will automatically create and append its own canvas child to this div */}
          <div 
            ref={canvasRef as unknown as React.RefObject<HTMLDivElement>} 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width,
              height,
              pointerEvents: 'none', // Allows clicking through to the image/elements below
              zIndex: 10
            }}
          >
            {/* heatmap.js will append its canvas here */}
          </div>
        </div>

        {/* Right-Side Toolbar */}
        <div className={styles.rightSideToolbar}>
          <TextField
            select
            fullWidth
            label="Region"
            value={regionHex}
            onChange={({ target: { value } }) => {
              setRegionHex(value as HexKeysUnion);
            }}
          >
            {
              getObjectEntries(hexInfo)
                .sort((([, { name: nameA }], [, { name: nameB }]) => {
                  if (nameA < nameB) {
                    return -1;
                  }
                  return 1;
                }))
                .map(([key, { name }]) => {
                  return (
                    <MenuItem
                      key={key}
                      value={key}
                    >
                      {name}
                    </MenuItem>
                  )
                })
            }
          </TextField>

          <TextField
            select
            fullWidth
            label="From"
            value={startWarNumber}
            onChange={({ target: { value } }) => {
              setStartWarNumber(value);
            }}
          >
            {getWarNumberMenuItems()}
          </TextField>

          <TextField
            select
            fullWidth
            label="Upto"
            value={endWarNumber}
            onChange={({ target: { value } }) => {
              setEndWarNumber(value);
            }}
          >
            {getWarNumberMenuItems()}
          </TextField>

          <Typography gutterBottom>Red Value: {max}</Typography>
          <Slider
            aria-label="Max"
            defaultValue={1}
            value={max}
            onChange={(event: Event, newValue: number | number[]) => {
              if (typeof newValue === 'number') {
                setMax(newValue)
              }
            }}
            valueLabelDisplay="auto"
            shiftStep={0.1}
            step={0.1}
            marks
            min={1}
            max={10}
          />

          <Typography
            gutterBottom
            onClick={() => {
              console.log('Page Data', {
                structureData,
                heatmapData,
                max,
                structureValue,
                startWarNumber,
                endWarNumber,
              })
            }}
          >
            Structure Value: {structureValue}
          </Typography>
          <Slider
            aria-label="Structure Value"
            defaultValue={1}
            value={structureValue}
            onChange={(event: Event, newValue: number | number[]) => {
              if (typeof newValue === 'number') {
                setStructureValue(newValue)
              }
            }}
            valueLabelDisplay="auto"
            shiftStep={0.1}
            step={0.1}
            marks
            min={0.1}
            max={5}
          />
        </div>
      </div>
    </div>
  )
}