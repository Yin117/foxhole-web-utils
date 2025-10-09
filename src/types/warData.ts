import { HexKeys, HexKeysUnion } from "@/consts/foxhole";

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

export type MetaPlatform = {
  teamId: TeamId;
  iconType: 59 | 60;
  x: number;
  y: number;
  flags: number;
  viewDirection?: number;
  detected: string;
  isDestroyed?: boolean;
  destructionDetected?: string;
}

export type MetaRocketSite = {
  teamId: TeamId;
  iconType: 37 | 72;
  x: number;
  y: number;
  flags: number;
  viewDirection?: number;
  detected: string;
  isDestroyed?: boolean;
  destructionDetected?: string;

  rocketDetected: null; // unintended field
}

export type MetaRocketTarget = {
  teamId: TeamId;
  iconType: 70;
  x: number;
  y: number;
  flags: number;
  viewDirection?: number;
  detected: string;
  isGone?: boolean;
  goneWhen?: string;
}

export type MetaRocketGroundZero = {
  teamId: TeamId;
  iconType: 71;
  x: number;
  y: number;
  flags: number;
  viewDirection?: number;
  detected: string;
  isGone?: boolean;
  goneWhen?: string;
}

export type MetaMapDynamic = {
  inserted: string;
  mapName: HexKeysUnion;
  platforms: MetaPlatform[];
  rocketSites: MetaRocketSite[];
  rocketTargets: MetaRocketTarget[];
  rocketGroundZeros: MetaRocketGroundZero[];
}

export type WarPlatformsRecordFormat = Record<HexKeysUnion, {
  inserted: string;
  mapName: HexKeysUnion;
  platforms: MetaPlatform[];
}>

export type WarPlatforms = Array<{
  inserted: string;
  mapName: HexKeysUnion;
  platforms: MetaPlatform[];
}>