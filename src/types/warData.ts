export type mapItem = {
  teamId: 'NONE' | 'COLONIALS' | 'WARDENS',
  iconType: number,
  x: number,
  y: number,
  flags: number,
  viewDirection?: number,
};

export type mapDynamic = {
  mapName: string,
  regionId: number,
  scorchedVictoryTowns: number,
  mapItems: mapItem[],
}