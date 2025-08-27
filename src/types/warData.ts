import { HexKeysUnion } from "@/consts/foxhole";

export type TeamId = 'NONE' | 'COLONIALS' | 'WARDENS'

export type MapItem = {
  teamId: TeamId,
  iconType: number,
  x: number,
  y: number,
  flags?: number,
  viewDirection?: number,
};

export type MapDynamic = {
  inserted: string;
  mapName: HexKeysUnion,
  regionId: number,
  scorchedVictoryTowns?: number,
  mapItems: MapItem[],
  etag?: string;
}

export type WarState = {
  conquestEndTime: number | null,
  conquestStartTime: number | null,
  requiredVictoryTowns: number,
  resistanceStartTime: number | null,
  warId: string,
  warNumber: number,
  winner: TeamId,
};