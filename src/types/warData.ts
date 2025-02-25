import { HexKeys, HexKeysUnion } from "@/consts/foxhole";

export type TeamId = 'NONE' | 'COLONIALS' | 'WARDENS'

export type MapItem = {
  teamId: TeamId,
  iconType: number,
  x: number,
  y: number,
  flags: number,
  viewDirection?: number,
};

export type MapDynamic = {
  mapName: HexKeysUnion,
  regionId: number,
  scorchedVictoryTowns: number,
  mapItems: MapItem[],
}