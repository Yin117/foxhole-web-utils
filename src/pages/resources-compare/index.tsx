'use client'

import dynamic from 'next/dynamic';
import pageStyles from "@/app/page.module.css";
import { getMapDynamicForWar } from "@/utils/warData";
import {
  Box,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import styles from './resources-compare.module.css';
import { getMapItemDetail, hexInfo, HexKeys, HexKeysUnion, warNumbers, worldExtents } from '@/consts/foxhole';
import { getObjectEntries } from '@/helpers/typescriptHelper';
import { MapDynamic } from '@/types/warData';

// TODO: Responsive: https://konvajs.org/docs/sandbox/Responsive_Canvas.html

const Region = dynamic(() => import('@/components/canvas/Region'), {
  ssr: false,
});

// function getRegionWidth(window: Window) {
//   return window.innerWidth * 0.4;
// }
function getRegionHeight(window: Window) {
  return window.innerHeight * 0.75;
}

function refactorMapDynamicData(display: MapDynamic) { // , compare: MapDynamic | undefined) {

  const newMapItems = display.mapItems
    .filter(({ iconType }) => {
      const details = getMapItemDetail(iconType);

      if (details.isUndocumented) {
        return false;
      }
      if (details.isPlayerBuilt) {
        return false;
      }
      return true;
    })
    .map(item => {
      const details = getMapItemDetail(item.iconType);

      return {
        ...item,
        opacity: details.isResource ? 1 : 0.25,
      };
    });

  return {
    ...display,
    mapItems: newMapItems,
  };
}

const warNumberMenuItems = 
  warNumbers.map(wn => {
    return (
      <MenuItem
        key={wn}
        value={wn}
      >
        WC{wn}
      </MenuItem>
    )
  });


function NoDataBox() {
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      width={worldExtents.getWidthFromHeight(getRegionHeight(window))}
      height={getRegionHeight(window)}
    >
      <Typography>No Data</Typography>
    </Box>
  )
}


export function ResourcesComparePage() {
  const [beforeWarNumber, setBeforeWarNumber] = useState(warNumbers[0]);
  const [afterWarNumber, setAfterWarNumber] = useState(warNumbers[warNumbers.length - 1]);
  const [regionHex, setRegionHex] = useState<HexKeysUnion>(HexKeys.WestgateHex);

  const worldMapDynamicDataForWarBefore = useMemo(() => {
    return getMapDynamicForWar(beforeWarNumber);
  }, [beforeWarNumber]);

  const worldMapDynamicDataForWarAfter = useMemo(() => {
    return getMapDynamicForWar(afterWarNumber);
  }, [afterWarNumber]);

  const hexMapDynamicForWarBefore = useMemo(() => {
    if (!worldMapDynamicDataForWarBefore) {
      return undefined;
    }
    console.log('worldMapDynamicDataForWarBefore', worldMapDynamicDataForWarBefore);
    return worldMapDynamicDataForWarBefore?.find(({ mapName }) => mapName === regionHex);
  }, [worldMapDynamicDataForWarBefore, regionHex]);

  const hexMapDynamicForWarAfter = useMemo(() => {
    if (!worldMapDynamicDataForWarAfter) {
      return undefined;
    }
    console.log('worldMapDynamicDataForWarAfter', worldMapDynamicDataForWarAfter);
    return worldMapDynamicDataForWarAfter?.find(({ mapName }) => mapName === regionHex);
  }, [worldMapDynamicDataForWarAfter, regionHex]);

  console.log('hexMapDynamicForWarBefore', hexMapDynamicForWarBefore);
  console.log('hexMapDynamicForWarAfter', hexMapDynamicForWarAfter);

  // TODO: Refactor this into importing files from /pages
  // This will be made up of several components in order to simplifiy
  // the code and handle edge cases, such as if War Number picked is invalid

  if (!window) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className={pageStyles.page}>
      <div className={styles.container}>

        {/* Toolbar */}
        <div className={styles.toolbarLeft}>
          <TextField
            select
            fullWidth
            label="War Number"
            value={beforeWarNumber}
            onChange={({ target: { value } }) => {
              setBeforeWarNumber(value);
            }}
          >
            {warNumberMenuItems}
          </TextField>
        </div>

        <div className={styles.toolbarMid}>
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
        </div>
        
        <div className={styles.toolbarRight}>
          <TextField
            select
            fullWidth
            label="War Number"
            value={afterWarNumber}
            onChange={({ target: { value } }) => {
              setAfterWarNumber(value);
            }}
          >
            {warNumberMenuItems}
          </TextField>
        </div>

        {/* Left */}
        <div className={styles.regionBefore}>
          {hexMapDynamicForWarBefore ?
          <Region
            data={refactorMapDynamicData(hexMapDynamicForWarBefore /*, hexMapDynamicForWarAfter*/)}
            width={worldExtents.getWidthFromHeight(getRegionHeight(window))}
            height={getRegionHeight(window)}
          /> : (
            <NoDataBox/>
          )}
        </div>

        {/* Middle */}
        <div className={styles.middle}>
            <Typography variant="body2">
              Note, Region Images are not back-dated to their historic versions
            </Typography>
        </div>

        {/* Right */}
        <div  className={styles.regionAfter}>
          {hexMapDynamicForWarAfter ?
          <Region
            data={refactorMapDynamicData(hexMapDynamicForWarAfter /*, hexMapDynamicForWarBefore*/)}
            width={worldExtents.getWidthFromHeight(getRegionHeight(window))}
            height={getRegionHeight(window)}
            /> : (
              <NoDataBox/>
            )}
        </div>
      </div>
    </div>
  )
}