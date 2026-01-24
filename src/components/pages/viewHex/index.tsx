'use client'

import { getCurrentMapDynamicForRegion } from "@/apiFunctions/foxhole/dynamicMap";
import pageStyles from "@/app/page.module.css";
import { Positioning } from "@/components/canvas/Region";
import { getMapItemDetail, hexInfo, HexKeys, HexKeysUnion, shards, worldExtents } from "@/consts/foxhole";
import { getObjectEntries } from "@/helpers/typescriptHelper";
import { ShardKeys } from "@/types/api";
import {
  Box,
  Button,
  List,
  ListItem,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const Region = dynamic(() => import('@/components/canvas/Region'), {
  ssr: false,
});

export function ViewHex() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const regionSize = useMemo(() => {
    let width = (window.innerWidth * 0.75) - 50;
    let height = worldExtents.getHeightFromWidth(width);

    if (height > window.innerHeight) {
      height = window.innerHeight - 100;
      width = worldExtents.getWidthFromHeight(height);
    }

    return {
      width,
      height,
    };
  }, []);

  const [currentShard, setCurrentShard] = useState<ShardKeys>('live1');
  const [regionHex, setRegionHex] = useState<HexKeysUnion>(HexKeys.AcrithiaHex);

  // API fetch of Map Dynamic
  const hexApiMapDynamicRes = useQuery({
    queryKey: [currentShard, regionHex],
    queryFn: async () => {
      const funcRes = await getCurrentMapDynamicForRegion(shards[currentShard], regionHex);
      console.log('funcRes', funcRes);
      return funcRes;
    },
  });
  console.log('hexApiMapDynamicRes', hexApiMapDynamicRes);
  const {
    isPending: hexApiMapDynamicIsPending,
    isError: hexApiMapDynamicIsError,
    data: hexApiMapDynamicData,
  } = hexApiMapDynamicRes;

  // Zoom handling
  const [stage, setStage] = useState<Positioning>({
    scale: 1,
    x: 0,
    y: 0,
  });

  const iconTypeToDetailsAndCount = useMemo(() => {
    return hexApiMapDynamicData?.data.mapItems.reduce((ac, mapItem) => {
      const detail = getMapItemDetail(mapItem.iconType);
      if (ac[mapItem.iconType] == undefined) {
        ac[mapItem.iconType] = {
          isUnexpectedInAPI: detail ? detail?.isUnexpectedInAPI ?? false : true,
          isStormCannon: detail?.isStormCannon ?? false,
          isIntelCenter: detail?.isIntelCenter ?? false,
          isAirRadar: detail?.isAirRadar ?? false,
          name: detail?.name ?? 'UNKNOWN',
          count: 0,
        }
      }
      ac[mapItem.iconType].count++;
      return ac;
    }, {} as Record<number, {
      name: string,
      count: number,
      isUnexpectedInAPI: boolean,
      isStormCannon: boolean,
      isIntelCenter: boolean,
      isAirRadar: boolean,
    }>);
  }, [hexApiMapDynamicData]);
  console.log('iconTypeToDetailsAndCount', iconTypeToDetailsAndCount);



  if (!isClient || typeof window === 'undefined') {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div id="components-pages-viewHex" className={pageStyles.page}>

      <Box display="flex" flexDirection="row" justifyContent="space-between" gap={1}>

        {/* Left */}
        <Box width={regionSize.width} height={regionSize.height}>
          {hexApiMapDynamicData?.data.mapItems &&
          // TODO: Refactor to state driven
          <Region
            hex={regionHex}
            data={hexApiMapDynamicData.data}
            width={regionSize.width}
            height={regionSize.height}
            stage={stage}
            onPositioning={setStage}
          />}

          {hexApiMapDynamicIsPending === true &&
          <Box>
            <Typography variant="h3">
              Loading...
            </Typography>
          </Box>}

          {hexApiMapDynamicIsError === true &&
          <Box>
            <Typography variant="h3">
              Error (API Offline?)
            </Typography>
          </Box>}
        </Box>

        {/* Right */}
        <Box display="flex" flexDirection="column" gap={2}>
          <ToggleButtonGroup value={currentShard} onChange={(_e, value) => setCurrentShard(value)} exclusive>
            {getObjectEntries(shards).map(([shardKey, shard]) => {
              return (
                <ToggleButton key={shardKey} value={shardKey} >
                  {shard.name}
                </ToggleButton>
              )
            })}
          </ToggleButtonGroup>
          
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

          <Button onClick={() => setStage({
            scale: 1,
            x: 0,
            y: 0,
          })}>
            Reset Pan & Zoom
          </Button>

          {iconTypeToDetailsAndCount &&
          <Box>
            <List>
              {getObjectEntries(iconTypeToDetailsAndCount)
                .filter(([, data]) => {
                  return (
                    data.isUnexpectedInAPI === true ||
                    data.isStormCannon === true ||
                    data.isIntelCenter === true ||
                    data.isAirRadar === true
                  )
                })
                .map(([iconType, data]) => {
                  return (
                    <ListItem key={iconType}>
                      {data.name} ({iconType}): {data.count} 
                    </ListItem>
                  )
                })}
            </List>
          </Box>}

        </Box>


      </Box>

    </div>
  )
}