'use client'

import dynamic from 'next/dynamic';
import pageStyles from "@/app/page.module.css";
import { getMapDynamicForWar } from "@/utils/warData";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import styles from './resourcesCompare.module.css';
import { getMapItemDetail, hexInfo, HexKeys, HexKeysUnion, shards, warNumbers, worldExtents } from '@/consts/foxhole';
import { getObjectEntries } from '@/helpers/typescriptHelper';
import { MapDynamic } from '@/types/warData';
import { useQuery } from '@tanstack/react-query';
import { getCurrentMapDynamicForRegion } from '@/apiFunctions/foxhole/dynamicMap';
import { getCurrentWarState } from '@/apiFunctions/foxhole/war';
import { Positioning } from '@/components/canvas/Region';

// TODO: Responsive: https://konvajs.org/docs/sandbox/Responsive_Canvas.html

const CURRENT_WAR = 'CurrentWar';

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

      if (!details) {
        return false;
      }

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
        opacity: details?.isResource ?? true ? 1 : 0.25,
      };
    });

  return {
    ...display,
    mapItems: newMapItems,
  };
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
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    data: currentWarData,
  } = useQuery({
    queryKey: ['CurrentWar'],
    queryFn: async () => {
      return await getCurrentWarState();
    },
    enabled: true,
  });

  const [beforeWarNumber, setBeforeWarNumber] = useState(CURRENT_WAR);
  const [afterWarNumber, setAfterWarNumber] = useState(warNumbers[warNumbers.length - 1]);
  const [regionHex, setRegionHex] = useState<HexKeysUnion>(HexKeys.WestgateHex);
  

  const {
    data: currentWarMapDynamicRes,
  } = useQuery({
    queryKey: ['MapDynamic', regionHex],
    queryFn: async () => {
      return await getCurrentMapDynamicForRegion(shards.live1, regionHex)
    },
    staleTime: 1000 * 60 * 5, // 5mins
    enabled: true,
  });

  console.log('currentWarMapDynamicRes', currentWarMapDynamicRes);
  
  const [stage, setStage] = useState<Positioning>({
    scale: 1,
    x: 0,
    y: 0,
  });

  // World - Before 
  const worldMapDynamicDataForWarBefore = useMemo(() => {
    return getMapDynamicForWar(beforeWarNumber);
  }, [beforeWarNumber]);

  // World - After
  const worldMapDynamicDataForWarAfter = useMemo(() => {
    return getMapDynamicForWar(afterWarNumber);
  }, [afterWarNumber]);

  // Map Dynamic - Before
  const hexMapDynamicForWarBefore = useMemo(() => {
    if (beforeWarNumber === CURRENT_WAR) {
      return currentWarMapDynamicRes?.data
    }
    if (!worldMapDynamicDataForWarBefore) {
      return undefined;
    }
    console.log('worldMapDynamicDataForWarBefore', worldMapDynamicDataForWarBefore);
    return worldMapDynamicDataForWarBefore?.find(({ mapName }) => mapName === regionHex);
  }, [worldMapDynamicDataForWarBefore, regionHex, beforeWarNumber, currentWarMapDynamicRes?.data]);

  // Map Dynamic - After
  const hexMapDynamicForWarAfter = useMemo(() => {
    if (afterWarNumber === CURRENT_WAR) {
      return currentWarMapDynamicRes?.data
    }
    if (!worldMapDynamicDataForWarAfter) {
      return undefined;
    }
    console.log('worldMapDynamicDataForWarAfter', worldMapDynamicDataForWarAfter);
    return worldMapDynamicDataForWarAfter?.find(({ mapName }) => mapName === regionHex);
  }, [worldMapDynamicDataForWarAfter, regionHex, afterWarNumber, currentWarMapDynamicRes?.data]);

  console.log('hexMapDynamicForWarBefore', hexMapDynamicForWarBefore);
  console.log('hexMapDynamicForWarAfter', hexMapDynamicForWarAfter);

  // TODO: Refactor this into importing files from /pages
  // This will be made up of several components in order to simplifiy
  // the code and handle edge cases, such as if War Number picked is invalid

  if (!isClient || typeof window === 'undefined') {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div id="components-pages-resourcesCompare" className={pageStyles.page}>
      <div className={styles.container}>

        {/* Toolbar */}
        <div className={styles.toolbarLeft}>
          <TextField
            select
            fullWidth
            label="War"
            value={beforeWarNumber}
            onChange={({ target: { value } }) => {
              setBeforeWarNumber(value);
            }}
          >
            <MenuItem value={CURRENT_WAR}>
              Current War
            </MenuItem>
            {getWarNumberMenuItems()}
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
            label="War"
            value={afterWarNumber}
            onChange={({ target: { value } }) => {
              setAfterWarNumber(value);
            }}
          >
            <MenuItem value={CURRENT_WAR}>
              Current War
            </MenuItem>
            {getWarNumberMenuItems(currentWarData?.data.warNumber)}
          </TextField>
        </div>

        {/* Left */}
        <div className={styles.regionBefore}>
          {hexMapDynamicForWarBefore ?
          <Region
            hex={regionHex}
            data={refactorMapDynamicData(hexMapDynamicForWarBefore /*, hexMapDynamicForWarAfter*/)}
            width={worldExtents.getWidthFromHeight(getRegionHeight(window))}
            height={getRegionHeight(window)}
            stage={stage}
            onPositioning={setStage}
          /> : (
            <NoDataBox/>
          )}
        </div>

        {/* Middle */}
        <div className={styles.middle}>
            <Typography variant="body2">
              Note, Region Images are not back-dated to their historic versions
            </Typography>
            

            <Button onClick={() => setStage({
              scale: 1,
              x: 0,
              y: 0,
            })}>
              Reset Pan & Zoom
            </Button>
        </div>

        {/* Right */}
        <div  className={styles.regionAfter}>
          {hexMapDynamicForWarAfter ?
          <Region
            hex={regionHex}
            data={refactorMapDynamicData(hexMapDynamicForWarAfter /*, hexMapDynamicForWarBefore*/)}
            width={worldExtents.getWidthFromHeight(getRegionHeight(window))}
            height={getRegionHeight(window)}
            stage={stage}
            onPositioning={setStage}
          /> : (
              <NoDataBox/>
          )}
        </div>
      </div>
    </div>
  )
}