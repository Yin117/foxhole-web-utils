'use client'

import { getMapList } from "@/apiFunctions/foxhole/mapList";
import pageStyles from "@/app/page.module.css";
import { HexInfo, hexInfo, shards } from "@/consts/foxhole";
import { getObjectEntries } from "@/helpers/typescriptHelper";
import { ShardKeys } from "@/types/api";
import { MapList } from "@/types/warData";
import { Box, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";




export function ViewMapList() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [currentShard, setCurrentShard] = useState<ShardKeys>('live1');
    
  const mapListRes = useQuery<AxiosResponse<MapList, unknown>>({
    queryKey: [currentShard],
    queryFn: async () => {
      return await getMapList(shards[currentShard]);
    }
  });
  const {
    isPending: mapListIsPending,
    isError: mapListIsError,
    data: mapListData,
  } = mapListRes;


  if (!isClient || typeof window === 'undefined') {
    return <Typography>Loading...</Typography>;
  }


  return (
    <div id="components-pages-viewHex" className={pageStyles.page}>

      <Box width="100%" height="100%">
        {/* Top */}
        <Box paddingBottom={2}>
          <ToggleButtonGroup value={currentShard} onChange={(_e, value) => setCurrentShard(value)} exclusive>
            {getObjectEntries(shards).map(([shardKey, shard]) => {
              return (
                <ToggleButton key={shardKey} value={shardKey} >
                  {shard.name}
                </ToggleButton>
              )
            })}
          </ToggleButtonGroup>

        </Box>

        <>
          {/* Content */}
          {mapListData?.data instanceof Array &&
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            gap={2}
            flexWrap="wrap"
            maxWidth="60%"
            maxHeight="70%"
          >
            {mapListData?.data
            .sort()
            .map((hexKey) => {
              const info: HexInfo | undefined  = hexInfo[hexKey];

              if (info == undefined || info?.isUndocumented === true) {
                return (
                  <Tooltip key={hexKey} title="Is Undocumented/Unexpected">
                    <Box
                      padding={1}
                      border="1px solid red"
                      sx={{ cursor: 'help'}}
                    >
                      <Typography>
                        {hexKey}
                      </Typography>
                    </Box>
                  </Tooltip>
                )
              }

              return (
                <Box
                  key={hexKey}
                >
                  <Typography>
                    {hexKey}
                  </Typography>
                </Box>
              )
            })

            }
          </Box>}
          {mapListIsPending === true &&
          <Box>
            <Typography variant="h3">
              Loading...
            </Typography>
          </Box>}
          {mapListIsError === true &&
          <Box>
            <Typography variant="h3">
              Error (API Offline?)
            </Typography>
          </Box>}
        </>


      </Box>

    </div>
  )

}