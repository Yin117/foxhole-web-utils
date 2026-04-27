'use client'

import pageStyles from "@/app/page.module.css";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useMemo, useState } from "react";
import styles from './metaStats.module.css';
import Image from "next/image";
import { mapItemBasePath } from '@/consts/repo';
import { warNumberToMetaMapDynamic } from "@/consts/warData/metaMapDynamic";
import { factionKeyToProp, getMapItemDetail } from "@/consts/foxhole";

interface Column {
  id: string;
  content: string | ReactNode;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: number) => string;
}

type BuiltLost = {
  built: number,
  lost: number,
}
type RowData = {
  wc: string;
  sc: {
    colonials: BuiltLost,
    wardens: BuiltLost,
  },
  ic: {
    colonials: BuiltLost,
    wardens: BuiltLost,
  },
  rocketSites: {
    colonials: BuiltLost,
    wardens: BuiltLost,
  },
  rocketGroundZeros: {
    colonials: number,
    wardens: number,
  },
  airRadar: {
    colonials: BuiltLost,
    wardens: BuiltLost,
  },
  weatherStation: {
    colonials: BuiltLost,
    wardens: BuiltLost,
  }
}

const borderLeft = { borderLeft: '1px solid gainsboro' };

function hyphen(val: number) {
  return val > 0 ? `${val}` : '-';
}

export function MetaStats() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const columns = useMemo<Column[]>(() => {
    return [
      { id: 'WC', content: 'War', minWidth: 50, align: "center" },
      { id: 'SCBuilt', content: 'Built', minWidth: 100, align: "center" },
      { id: 'SCLost', content: 'Lost', minWidth: 100, align: "center" },
      { id: 'ICBuilt', content: 'Built', minWidth: 100, align: "center" },
      { id: 'ICLost', content: 'Lost', minWidth: 100, align: "center" },
      { id: 'RocketSiteBuilt', content: 'Built', minWidth: 100, align: "center" },
      { id: 'RocketSiteLost', content: 'Lost', minWidth: 100, align: "center" },
      {
        id: 'RocketGroundZero',
        content: (
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={2}>
            Impact
            <Image
              src={`${mapItemBasePath}/MapIconRocketGroundZero.png`}
              width={20}
              height={20}
              alt="Rocket Ground Zero"
            />
          </Box>
        ),
        minWidth: 100,
        align: "center"
      },
      { id: 'ARBuilt', content: 'Built', minWidth: 100, align: 'center' },
      { id: 'ARLost' , content: 'Lost' , minWidth: 100, align: 'center' },
      { id: 'WSBuilt', content: 'Built', minWidth: 100, align: 'center' },
      { id: 'WSLost' , content: 'Lost' , minWidth: 100, align: 'center' },
    ]
  }, []);

  const rowData = useMemo<RowData[]>(() => {
    const ret = (isClient ? warNumberToMetaMapDynamic.entries().toArray() : []).map(([wc, worldData]) => {
      const totals = {
        colonials: {
          sc: {
            built: 0,
            lost: 0,
          },
          ic: {
            built: 0,
            lost: 0,
          },
          rocketSites: {
            built: 0,
            lost: 0,
          },
          rocketGroundZeros: 0,
          airRadar: {
            built: 0,
            lost: 0,
          },
          weatherStation: {
            built: 0,
            lost: 0,
          }
        },
        wardens: {
          sc: {
            built: 0,
            lost: 0,
          },
          ic: {
            built: 0,
            lost: 0,
          },
          rocketSites: {
            built: 0,
            lost: 0,
          },
          rocketGroundZeros: 0,
          airRadar: {
            built: 0,
            lost: 0,
          },
          weatherStation: {
            built: 0,
            lost: 0,
          }
        },
        none: {
          sc: {
            built: 0,
            lost: 0,
          },
          ic: {
            built: 0,
            lost: 0,
          },
          rocketSites: {
            built: 0,
            lost: 0,
          },
          rocketGroundZeros: 0,
          airRadar: {
            built: 0,
            lost: 0,
          },
          weatherStation: {
            built: 0,
            lost: 0,
          }
        },
      }

      if (!(worldData instanceof Array)) {
        console.error('WorldData is not an Instance of an Array', wc, worldData);
      }

      for (const mapData of worldData) {
        for (const platform of mapData.platforms) {
          const factionKey = factionKeyToProp(platform.teamId);
          if (getMapItemDetail(platform.iconType)?.isStormCannon) {
            totals[factionKey].sc.built += 1;
            if (platform.isDestroyed === true) {
              totals[factionKey].sc.lost += 1;
            }
          }
          if (getMapItemDetail(platform.iconType)?.isIntelCenter) {
            totals[factionKey].ic.built += 1;
            if (platform.isDestroyed === true) {
              totals[factionKey].ic.lost += 1;
            }
          }
        }
        for (const site of mapData.rocketSites) {
          const factionKey = factionKeyToProp(site.teamId);
          totals[factionKey].rocketSites.built += 1;
          if (site.isDestroyed === true) {
            totals[factionKey].rocketSites.lost += 1;
          }
        }
        for (const groundZero of mapData.rocketGroundZeros) {
          const factionKey = factionKeyToProp(groundZero.teamId);
          totals[factionKey].rocketGroundZeros += 1;
        }
        for (const airRadar of mapData.airRadars ?? []) {
          const factionKey = factionKeyToProp(airRadar.teamId);
          totals[factionKey].airRadar.built += 1;
          if (airRadar.isDestroyed === true) {
            totals[factionKey].airRadar.lost += 1;
          }
        }
        for (const weatherStation of mapData.weatherStation ?? []) {
          const factionKey = factionKeyToProp(weatherStation.teamId);
          totals[factionKey].weatherStation.built += 1;
          if (weatherStation.isDestroyed === true) {
            totals[factionKey].weatherStation.lost += 1;
          }
        }
      }

      return {
        wc,
        sc: {
          colonials: totals.colonials.sc,
          wardens: totals.wardens.sc,
        },
        ic: {
          colonials: totals.colonials.ic,
          wardens: totals.wardens.ic,
        },
        rocketSites: {
          colonials: totals.colonials.rocketSites,
          wardens: totals.wardens.rocketSites,
        },
        rocketGroundZeros: {
          colonials: totals.colonials.rocketGroundZeros,
          wardens: totals.wardens.rocketGroundZeros,
        },
        airRadar: {
          colonials: totals.colonials.airRadar,
          wardens: totals.wardens.airRadar,
        },
        weatherStation: {
          colonials: totals.colonials.weatherStation,
          wardens: totals.wardens.weatherStation,
        },
      }
    });
    return ret;
  }, [isClient]);


  if (!isClient || typeof window === 'undefined') {
    return <Typography>Loading...</Typography>;
  }
  return (
    <div id="components-pages-metaStats" className={pageStyles.page}>
      <div className={styles.container}>
        <Box>
          <Typography variant="body1" fontSize="small" textAlign="center" fontStyle="italic" marginBottom={2}>
            Disclaimer: Totals below are <strong>not incremental</strong>, and only consider their last situation. That is to say for example; if a Storm Cannon is Built, Destroyed,
            and then Rebuilt it will only count once for Built (and Zero for lost). Likiwise the same for Rocket Sites in that
            the numbers below should be read as Sites, not as individual rockets (which are assembled upon a Site).
          </Typography>
          <TableContainer sx={{ maxHeight: '80vh'}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    "& .MuiTableCell-root": { backgroundColor: "background.paper" },
                }}
              >
                <TableRow>
                  <TableCell align="center" colSpan={1}>
                    {/* WC */}
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={2}>
                      Storm Cannons
                      <Image
                        src={`${mapItemBasePath}/MapIconStormCannon.png`}
                        width={20}
                        height={20}
                        alt="Storm Cannon"
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={2}>
                      Intel Centers
                      <Image
                        src={`${mapItemBasePath}/MapIconIntelCenter.png`}
                        width={20}
                        height={20}
                        alt="Intel Center"
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={2}>
                      Rocket Sites
                      <Image
                        src={`${mapItemBasePath}/MapIconRocketSiteWithRocket.png`}
                        width={20}
                        height={20}
                        alt="Rocket Site"
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center" colSpan={1}>
                    {/* Impacts */}
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={2}>
                      Air Radar
                      <Image
                        src={`${mapItemBasePath}/MapIconFortLargeRadar.png`}
                        width={20}
                        height={20}
                        alt="Air Radar"
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={2}>
                      Weather Station
                      <Image
                        src={`${mapItemBasePath}/MapIconWeatherStation.png`}
                        width={20}
                        height={20}
                        alt="Weather Station"
                      />
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.content}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData.map(({ wc, sc, ic, rocketSites, rocketGroundZeros, airRadar, weatherStation }) => {

                  return (
                    <TableRow key={wc}>
                      <TableCell>
                        WC{wc}
                      </TableCell>

                      <TableCell>
                        <Box display="flex" flexDirection="row" gap={1} justifyContent="space-between">
                          <Box>
                            <Typography variant="body1">Colonials</Typography>
                            <Typography variant="body1">Wardens</Typography>
                          </Box>
                          <Box display="flex" flexDirection="column" alignItems="center" minWidth="20%">
                            <Typography variant="body1">{hyphen(sc.colonials.built)}</Typography>
                            <Typography variant="body1">{hyphen(sc.wardens.built)}</Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box textAlign="center">
                          <Typography variant="body1">{hyphen(sc.colonials.lost)}</Typography>
                          <Typography variant="body1">{hyphen(sc.wardens.lost)}</Typography>
                        </Box>
                      </TableCell>

                      <TableCell style={borderLeft}>
                        <Box textAlign="center">
                          <Typography variant="body1">{hyphen(ic.colonials.built)}</Typography>
                          <Typography variant="body1">{hyphen(ic.wardens.built)}</Typography>
                        </Box>
                      </TableCell>
                      
                      <TableCell>
                        <Box textAlign="center">
                          <Typography variant="body1">{hyphen(ic.colonials.lost)}</Typography>
                          <Typography variant="body1">{hyphen(ic.wardens.lost)}</Typography>
                        </Box>
                      </TableCell>

                      <TableCell style={borderLeft}>
                        {(rocketSites.colonials.built > 0 || rocketSites.wardens.built > 0) &&
                        <Box textAlign="center">
                          <Typography variant="body1">{hyphen(rocketSites.colonials.built)}</Typography>
                          <Typography variant="body1">{hyphen(rocketSites.wardens.built)}</Typography>
                        </Box>}
                      </TableCell>

                      <TableCell>
                        {(rocketSites.colonials.lost > 0 || rocketSites.wardens.lost > 0) &&
                        <Box textAlign="center">
                          <Typography variant="body1">{hyphen(rocketSites.colonials.lost)}</Typography>
                          <Typography variant="body1">{hyphen(rocketSites.wardens.lost)}</Typography>
                        </Box>}
                      </TableCell>

                      <TableCell style={borderLeft}>
                        {(rocketGroundZeros.colonials > 0 || rocketGroundZeros.wardens > 0) ?
                        <Box textAlign="center">
                          <Typography variant="body1">{hyphen(rocketGroundZeros.colonials)}</Typography>
                          <Typography variant="body1">{hyphen(rocketGroundZeros.wardens)}</Typography>
                        </Box>
                        :
                        <Box>
                          {wc === '108' &&
                          <Typography variant="body1" fontSize="small" textAlign="center">
                            Buildable Rockets Added
                          </Typography>}  
                        </Box>}
                      </TableCell>

                      <>
                        {wc === '131' ?
                          <TableCell colSpan={2} style={borderLeft}>
                            <Box textAlign="center">
                              <Typography variant="body1" fontSize="small" textAlign="center">
                                Air Radar added WC132
                              </Typography>
                            </Box>
                          </TableCell> : 
                          <>
                            <TableCell style={borderLeft}>
                              {(airRadar.colonials.built > 0 || airRadar.wardens.built > 0) &&
                              <Box textAlign="center">
                                <Typography variant="body1">{hyphen(airRadar.colonials.built)}</Typography>
                                <Typography variant="body1">{hyphen(airRadar.wardens.built)}</Typography>
                              </Box>}
                            </TableCell>

                            <TableCell>
                              {(airRadar.colonials.lost > 0 || airRadar.wardens.lost > 0) &&
                              <Box textAlign="center">
                                <Typography variant="body1">{hyphen(airRadar.colonials.lost)}</Typography>
                                <Typography variant="body1">{hyphen(airRadar.wardens.lost)}</Typography>
                              </Box>}
                            </TableCell>
                          </>
                          }
                      </>

                      <>
                        {wc === '131' ?
                          <TableCell colSpan={2} style={borderLeft}>
                            <Box textAlign="center">
                              <Typography variant="body1" fontSize="small" textAlign="center">
                                Weather Stations not Recorded prior to WC132
                              </Typography>
                            </Box>
                          </TableCell> : 
                          <>
                            <TableCell style={borderLeft}>
                              {(weatherStation.colonials.built > 0 || weatherStation.wardens.built > 0) &&
                              <Box textAlign="center">
                                <Typography variant="body1">{hyphen(weatherStation.colonials.built)}</Typography>
                                <Typography variant="body1">{hyphen(weatherStation.wardens.built)}</Typography>
                              </Box>}
                            </TableCell>

                            <TableCell>
                              {(weatherStation.colonials.lost > 0 || weatherStation.wardens.lost > 0) &&
                              <Box textAlign="center">
                                <Typography variant="body1">{hyphen(weatherStation.colonials.lost)}</Typography>
                                <Typography variant="body1">{hyphen(weatherStation.wardens.lost)}</Typography>
                              </Box>}
                            </TableCell>
                          </>
                          }
                      </>
                      
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>
  )
}