import { getObjectEntries } from "@/helpers/typescriptHelper";
import { TeamId } from "@/types/warData";
import { warNumberToMapDynamic } from "./warData/mapDynamic";

const worldExtentsDraft = {
  x: {
    min: -109199.999997,
    max: 109199.999997,
    total: -1,
  },
  y: {
    min: -94499.99999580906, // 968410989,
    max: 94499.99999580906, // 968410989,
    total: -1,
  },
  getHeightFromWidth: (longD: number) => (longD / 2 / 2) * Math.sqrt(3) * 2,
  getWidthFromHeight: (height: number) => 2 * ((((height / 2) * 2) / 3) * Math.sqrt(3)),
};
worldExtentsDraft.x.total = Math.abs(worldExtentsDraft.x.min) + worldExtentsDraft.x.max;

export const worldExtents = worldExtentsDraft;


export const factions = {
  none: {
    mapItemKey: 'NONE',
    label: 'Netural',
    labelPlural: 'Warden',
  },
  wardens: {
    mapItemKey: 'WARDENS',
    label: 'Warden',
    labelPlural: 'Wardens',
  },
  colonials: {
    mapItemKey: 'COLONIALS',
    label: 'Colonial',
    labelPlural: 'Colonials',
  },
};

export const factionForKey = (key: TeamId) => {
  return getObjectEntries(factions).find(([, value]) => value.mapItemKey === key);
}


const warNumbersDraft = [''].slice(0, 0) satisfies string[];
warNumberToMapDynamic.forEach((value, key) => {
  warNumbersDraft.push(key);
});
warNumbersDraft.reverse();
export const warNumbers = warNumbersDraft;


type MapItemDetail = {
  name: string,
  friendlyName?: string,
  folder?: string,
  iconFunc?: (teamId?: TeamId) => string,
  isMapBase?: boolean,
  isNeutral?: boolean,
  isUndocumented?: boolean,
  isRocketType?: boolean,
  isRocketSiteEither?: boolean,
  isRocketSite?: boolean,
  isScoreBase?: boolean,
  doNotTint?: boolean,
  isStormCannon?: boolean,
  isIntelCenter?: boolean,
  isPlatform?: boolean,
  isBunker?: boolean,
  isResource?: boolean,
  isPlayerBuilt?: boolean,
};

export const iconTypeToMapDetail: Record<number, Partial<MapItemDetail>> = {
  5: {
    name: 'StaticBase1', // Removed in v0.46
  },
  6: {
    name: 'StaticBase2', // Removed in v0.46
  },
  7: {
    name: 'StaticBase3', // Removed in v0.46
  },
  8: {
    name: 'ForwardBase1',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconForwardBase1',
    isPlayerBuilt: true,
  },
  9: {
    name: 'ForwardBase2',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconForwardBase2',
    isPlayerBuilt: true,
  },
  10: {
    name: 'ForwardBase3',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconForwardBase3',
    isPlayerBuilt: true,
  },
  11: {
    name: 'Hospital',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconHospital',
  },
  12: {
    name: 'VehicleFactory',
    friendlyName: 'Garage',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconVehicle',
  },
  13: {
    name: 'Armory', // Old (Special Ammo)
  },
  14: {
    name: 'Supply Station',
  },
  15: {
    name: 'Workshop', // Old: crossed Wrenches?
  },
  16: {
    name: 'Manufacturing Plant', // Old
  },
  17: {
    name: 'Refinery',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconManufacturing',
  },
  18: {
    name: 'Shipyard',
    friendlyName: 'Shipyard',
    folder: 'MapIcons',
    iconFunc: () => 'Shipyard',
  },
  19: {
    name: 'Tech Center',
    friendlyName: 'Engineering Center',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconTechCenter',
  },
  20: {
    name: 'Salvage Field',
    folder: 'MapIcons',
    iconFunc: () => 'SalvageMapIcon',
    isNeutral: true,
    isResource: true,
  },
  21: {
    name: 'Component Field',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconComponents',
    isNeutral: true,
    isResource: true,
  },
  22: {
    // This is something
    name: 'Fuel Field',
    isResource: true,
  },
  23: {
    name: 'Sulfur Field',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconSulfur',
    isNeutral: true,
    isResource: true,
  },
  24: {
    name: 'World Map Tent',
  },
  25: {
    name: 'Travel Tent',
  },
  26: {
    name: 'Training Area',
  },
  27: {
    name: 'Special Base',
    friendlyName: 'Keep',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconsKeep',
    isMapBase: true,
  },
  28: {
    name: 'Observation Tower',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconObservationTower',
  },
  29: {
    name: 'Fort',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconFort',
  },
  30: {
    name: 'Troop Ship',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconTroopShip',
    isPlayerBuilt: true,
  },
  31: {
    isUndocumented: true,
    name: 'UNK-31',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  32: {
    name: 'Sulfur Mine',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconSulfurMine',
    isNeutral: true,
    isResource: true,
  },
  33: {
    name: 'Storage Facility',
    friendlyName: 'Storage Depot',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconStorageFacility',
  },
  34: {
    name: 'Factory',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconFactory',
  },
  35: {
    name: 'Garrison Station',
    friendlyName: 'Safehouse',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconSafehouse',
  },
  36: {
    name: 'Ammo Factory',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconArmory',
  },
  37: {
    name: 'Rocket Site',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconRocketSite',
    isRocketType: true,
    isRocketSiteEither: true,
    isRocketSite: true,
    isPlayerBuilt: true,
  },
  38: {
    name: 'Salvage Mine',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconScrapMine',
    isNeutral: true,
    isResource: true,
  },
  39: {
    name: 'Construction Yard',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconConstructionYard',
  },
  40: {
    name: 'Component Mine',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconComponentMine',
    isNeutral: true,
    isResource: true,
  },
  41: {
    name: 'Oil Well (old)',
    friendlyName: 'Oil Well (old)',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconFuel',
    isResource: true,
  },
  42: {
    isUndocumented: true,
    name: 'UNK-42',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  43: {
    isUndocumented: true,
    name: 'UNK-43',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  44: {
    isUndocumented: true,
    name: 'UNK-44',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  45: {
    name: 'Relic Base 1',
    friendlyName: 'Relic Base',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconRelicBase',
    isMapBase: true,
    isScoreBase: true,
  },
  46: {
    name: 'Relic Base 2',
    friendlyName: 'Relic Base',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconRelicBase',
    isMapBase: true,
    isScoreBase: true,
  },
  47: {
    name: 'Relic Base 3',
    friendlyName: 'Relic Base',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconRelicBase',
    isMapBase: true,
    isScoreBase: true,
  },
  48: {
    isUndocumented: true,
    name: 'BOB', // T1?
    folder: 'MapIcons',
    iconFunc: () => 'MapIconBunkerBaseTier1',
    isBunker: true,
    isPlayerBuilt: true,
  },
  49: {
    isUndocumented: true,
    name: 'BOB', // T2?
    folder: 'MapIcons',
    iconFunc: () => 'MapIconBunkerBaseTier2',
    isBunker: true,
    isPlayerBuilt: true,
  },
  50: {
    isUndocumented: true,
    name: 'BOB', // T3?
    folder: 'MapIcons',
    iconFunc: () => 'MapIconBunkerBaseTier3',
    isBunker: true,
    isPlayerBuilt: true,
  },
  51: {
    name: 'Mass Production Factory',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconMassProductionFactory',
  },
  52: {
    name: 'Seaport',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconSeaport',
  },
  53: {
    name: 'CoastalGun',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconCoastalGun',
  },
  55: {
    isUndocumented: true,
    name: 'Border Base',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconBorderBase',
  },
  56: {
    name: 'Town Base 1',
    friendlyName: 'Town Hall',
    folder: 'MapIcons',
    // TODO: Change to "iconFunc"
    iconFunc: (teamId?: TeamId) =>
      teamId === factions.colonials.mapItemKey
        ? 'MapIconTownBaseTier1Colonial'
        : teamId === factions.wardens.mapItemKey
          ? 'MapIconTownBaseTier1Warden'
          : 'MapIconTownBaseTier1',
    doNotTint: true,
    isMapBase: true,
    isScoreBase: true,
  },
  57: {
    name: 'Town Base 2',
    friendlyName: 'Town Hall',
    folder: 'MapIcons',
    // TODO: Change to "iconFunc"
    iconFunc: (teamId?: TeamId) =>
      teamId === factions.colonials.mapItemKey
        ? 'MapIconTownBaseTier2Colonial'
        : teamId === factions.wardens.mapItemKey
          ? 'MapIconTownBaseTier2Warden'
          : 'MapIconTownBaseTier1',
    doNotTint: true,
    isMapBase: true,
    isScoreBase: true,
  },
  58: {
    name: 'Town Base 3',
    friendlyName: 'Town Hall',
    folder: 'MapIcons',
    iconFunc: (teamId?: TeamId) =>
      teamId === factions.colonials.mapItemKey
        ? 'MapIconTownBaseTier3Colonial'
        : teamId === factions.wardens.mapItemKey
          ? 'MapIconTownBaseTier3Warden'
          : 'MapIconTownBaseTier1',
    doNotTint: true,
    isMapBase: true,
    isScoreBase: true,
  },
  59: {
    name: 'Storm Cannon',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconStormCannon',
    // iconWardens: 'MapIconStormCannon_WARDENS',
    // iconColonials: 'MapIconStormCannon_COLONIALS',
    // iconDestroyed: 'MapIconStormCannon_DESTROYED',
    isStormCannon: true,
    isPlatform: true,
    isPlayerBuilt: true,
    // dryingTimeMS: 1000 * 60 * 60 * 48, // 48hrs
  },
  60: {
    name: 'Intel Center',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconIntelCenterEdited',
    // iconWardens: 'MapIconIntelCenterEdited_WARDENS',
    // iconColonials: 'MapIconIntelCenterEdited_COLONIALS',
    // iconDestroyed: 'MapIconIntelCenterEdited_DESTROYED',
    isIntelCenter: true,
    isPlatform: true,
    isPlayerBuilt: true,
    // dryingTimeMS: 1000 * 60 * 60 * 24, // 24hrs
  },
  61: {
    name: 'Coal',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconCoal',
    isNeutral: true,
    isResource: true,
  },
  62: {
    name: 'Oil',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconFuel',
    isNeutral: true,
    isResource: true,
  },
  63: {
    isUndocumented: true,
    name: 'UNK-63',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  64: {
    isUndocumented: true,
    name: 'UNK-64',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  65: {
    isUndocumented: true,
    name: 'UNK-65',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  67: {
    isUndocumented: true,
    name: 'UNK-67',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  68: {
    isUndocumented: true,
    name: 'UNK-68',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  69: {
    isUndocumented: true,
    name: 'UNK-69',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  70: {
    name: 'Rocket Target',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconRocketTarget',
    isPlayerBuilt: true,
    // iconWardens: 'MapIconRocketTarget_WARDENS',
    // iconColonials: 'MapIconRocketTarget_COLONIALS',
    isRocketType: true,
    // isRocketTarget: true,
    // rocketSiteDistanceMaxMeters: 2000,
  },
  71: {
    name: 'Rocket Ground Zero',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconRocketGroundZero',
    isPlayerBuilt: true,
    // iconWardens: 'MapIconRocketGroundZero_WARDENS',
    // iconColonials: 'MapIconRocketGroundZero_COLONIALS',
    isRocketType: true,
    // isRocketGroundZero: true,
  },
  72: {
    name: 'Rocket Site With Rocket',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconRocketSiteWithRocket',
    isPlayerBuilt: true,
    // iconWardens: 'MapIconRocketSiteWithRocket_WARDENS',
    // iconColonials: 'MapIconRocketSiteWithRocket_COLONIALS',
    isRocketType: true,
    // isRocketSiteEither: true,
    // isRocketSiteWithRocket: true,
    // fuelTime: 1000 * 60 * 60 * 48,
  },
  73: {
    isUndocumented: true,
    name: 'UNK-73',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  74: {
    isUndocumented: true,
    name: 'UNK-74',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  75: {
    name: 'Facility Mine Oil Rig',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconFacilityMineOilRig',
    isResource: true,
  },
  76: {
    isUndocumented: true,
    name: 'UNK-76',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  77: {
    isUndocumented: true,
    name: 'UNK-77',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  78: {
    isUndocumented: true,
    name: 'UNK-78',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  79: {
    isUndocumented: true,
    name: 'UNK-79',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  80: {
    isUndocumented: true,
    name: 'UNK-80',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  81: {
    isUndocumented: true,
    name: 'UNK-81',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  82: {
    isUndocumented: true,
    name: 'UNK-82',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  83: {
    isUndocumented: true,
    name: 'Weather Station',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconWeatherStation',
    isPlayerBuilt: true,
  },
  84: {
    isUndocumented: true,
    name: 'Mortar House',
    folder: 'MapIcons',
    iconFunc: () => 'MapIcon_Temp_MortarHouse_84',
  }
};

export const getMapItemDetail = (iconType: number) => {
  return iconTypeToMapDetail[iconType];
}



export enum HexKeys {
  // Col 1
  'OarbreakerHex' = 'OarbreakerHex',
  'FishermansRowHex' = 'FishermansRowHex',
  'StemaLandingHex' = 'StemaLandingHex',
  // Col 2
  'NevishLineHex' = 'NevishLineHex',
  'FarranacCoastHex' = 'FarranacCoastHex',
  'WestgateHex' = 'WestgateHex',
  'OriginHex' = 'OriginHex',
  // Col 3
  'CallumsCapeHex' = 'CallumsCapeHex',
  'StonecradleHex' = 'StonecradleHex',
  'KingsCageHex' = 'KingsCageHex',
  'SableportHex' = 'SableportHex',
  'AshFieldsHex' = 'AshFieldsHex',
  // Col 4
  'SpeakingWoodsHex' = 'SpeakingWoodsHex',
  'MooringCountyHex' = 'MooringCountyHex',
  'LinnMercyHex' = 'LinnMercyHex',
  'LochMorHex' = 'LochMorHex',
  'HeartlandsHex' = 'HeartlandsHex',
  'RedRiverHex' = 'RedRiverHex',
  // Col 5
  'BasinSionnachHex' = 'BasinSionnachHex',
  'ReachingTrailHex' = 'ReachingTrailHex',
  'CallahansPassageHex' = 'CallahansPassageHex',
  'DeadLandsHex' = 'DeadLandsHex',
  'UmbralWildwoodHex' = 'UmbralWildwoodHex',
  'GreatMarchHex' = 'GreatMarchHex',
  'KalokaiHex' = 'KalokaiHex',
  // Col 6
  'HowlCountyHex' = 'HowlCountyHex',
  'ViperPitHex' = 'ViperPitHex',
  'MarbanHollow' = 'MarbanHollow', /** Is Correctly Different */
  'DrownedValeHex' = 'DrownedValeHex',
  'ShackledChasmHex' = 'ShackledChasmHex',
  'AcrithiaHex' = 'AcrithiaHex',
  // Col 7
  'ClansheadValleyHex' = 'ClansheadValleyHex',
  'WeatheredExpanseHex' = 'WeatheredExpanseHex',
  'ClahstraHex' = 'ClahstraHex',
  'AllodsBightHex' = 'AllodsBightHex',
  'TerminusHex' = 'TerminusHex',
  // Col 8
  'MorgensCrossingHex' = 'MorgensCrossingHex',
  'StlicanShelfHex' = 'StlicanShelfHex',
  'EndlessShoreHex' = 'EndlessShoreHex',
  'ReaversPassHex' = 'ReaversPassHex',
  // Col 9
  'GodcroftsHex' = 'GodcroftsHex',
  'TempestIslandHex' = 'TempestIslandHex',
  'TheFingersHex' = 'TheFingersHex',
};
export type HexKeysUnion = `${HexKeys}`;


export const hexInfo = {
  // Col 1 -----------------------------------------------------------
  /** Restored and Changed in Naval Update 2023-10-10 */
  OarbreakerHex: {
    name: 'Oarbreaker Isles',
    nameTiny: 'OB',
    folder: 'Maps',
    icon: 'MapOarbreakerHex',
  },
  /** Restored and Changed in Naval Update 2023-10-10 */
  FishermansRowHex: {
    name: "Fisherman's Row",
    nameTiny: 'FR',
    folder: 'Maps',
    icon: 'MapFishermansRowHex',
  },
  StemaLandingHex: {
    name: 'Stema Landing',
    nameTiny: 'SL',
    folder: 'Maps',
    icon: 'MapStemaLandingHex',
  },
  // Col 2 -----------------------------------------------------------
  NevishLineHex: {
    name: 'Nevish Line',
    nameTiny: 'NL',
    folder: 'Maps',
    icon: 'MapNevishLineHex',
  },
  /** Moved West 2023-06-12 */
  FarranacCoastHex: {
    name: 'Farranac Coast',
    nameTiny: 'FC',
    folder: 'Maps',
    icon: 'MapFarranacCoastHex',
  },
  /** Moved West 2023-06-12 */
  WestgateHex: {
    name: 'Westgate',
    nameTiny: 'WG',
    folder: 'Maps',
    icon: 'MapWestgateHex',
  },
  OriginHex: {
    name: 'Origin',
    nameTiny: 'Og',
    folder: 'Maps',
    icon: 'MapOriginHex',
  },
  // Col 3 -----------------------------------------------------------
  CallumsCapeHex: {
    name: "Callum's Cape",
    nameTiny: 'CC',
    folder: 'Maps',
    icon: 'MapCallumsCapeHex',
  },
  StonecradleHex: {
    name: 'Stonecradle',
    nameTiny: 'SC',
    folder: 'Maps',
    icon: 'MapStonecradleHex',
  },
  /** Added 2023-06-12 */
  KingsCageHex: {
    name: "King's Cage",
    nameTiny: 'KC',
    folder: 'Maps',
    icon: 'MapKingsCageHex',
  },
  /** Added 2023-06-12 */
  SableportHex: {
    name: 'Sableport',
    nameTiny: 'SP',
    folder: 'Maps',
    icon: 'MapSableportHex',
  },
  AshFieldsHex: {
    name: 'Ash Fields',
    nameTiny: 'Ash',
    folder: 'Maps',
    icon: 'MapAshFieldsHex',
  },
  // Col 4 -----------------------------------------------------------
  SpeakingWoodsHex: {
    name: 'Speaking Woods',
    nameTiny: 'SW',
    folder: 'Maps',
    icon: 'MapSpeakingWoodsHex',
  },
  MooringCountyHex: {
    name: 'Moors',
    nameTiny: 'Moors',
    folder: 'Maps',
    icon: 'MapMooringCountyHex',
  },
  LinnMercyHex: {
    name: 'Linn of Mercy',
    nameTiny: 'LoM',
    folder: 'Maps',
    icon: 'MapLinnMercyHex',
  },
  LochMorHex: {
    name: 'Loch Mor',
    nameTiny: 'LM',
    folder: 'Maps',
    icon: 'MapLochMorHex',
  },
  HeartlandsHex: {
    name: 'Heartlands',
    nameTiny: 'HL',
    folder: 'Maps',
    icon: 'MapHeartlandsHex',
  },
  RedRiverHex: {
    name: 'Red River',
    nameTiny: 'RR',
    folder: 'Maps',
    icon: 'MapRedRiverHex',
  },
  // Col 5 -----------------------------------------------------------
  BasinSionnachHex: {
    name: 'Basin Sionnach',
    nameTiny: 'BS',
    folder: 'Maps',
    icon: 'MapBasinSionnachHex',
  },
  ReachingTrailHex: {
    name: 'Reaching Trail',
    nameTiny: 'RT',
    folder: 'Maps',
    icon: 'MapReachingTrailHex',
  },
  CallahansPassageHex: {
    name: "Callahan's Passage",
    nameTiny: 'CP',
    folder: 'Maps',
    icon: 'MapCallahansPassageHex',
  },
  DeadLandsHex: {
    name: 'Deadlands',
    nameTiny: 'DL',
    folder: 'Maps',
    icon: 'MapDeadlandsHex', /** DIFFERENT TO HEX NAME */
  },
  UmbralWildwoodHex: {
    name: 'Umbral Wildwood',
    nameTiny: 'UW',
    folder: 'Maps',
    icon: 'MapUmbralWildwoodHex',
  },
  GreatMarchHex: {
    name: 'Great March',
    nameTiny: 'GM',
    folder: 'Maps',
    icon: 'MapGreatMarchHex',
  },
  KalokaiHex: {
    name: 'Kalokai',
    nameTiny: 'Kalo',
    folder: 'Maps',
    icon: 'MapKalokaiHex',
  },
  // Col 6 -----------------------------------------------------------
  HowlCountyHex: {
    name: 'Howl County',
    nameTiny: 'HC',
    folder: 'Maps',
    icon: 'MapHowlCountyHex',
  },
  ViperPitHex: {
    name: 'Viper Pit',
    nameTiny: 'VP',
    folder: 'Maps',
    icon: 'MapViperPitHex',
  },
  MarbanHollow: { /** DIFFERENT TO OTHER KEYS */
    name: 'Marban Hollow',
    nameTiny: 'MH',
    folder: 'Maps',
    icon: 'MapMarbanHollow',
  },
  DrownedValeHex: {
    name: 'Drowned Vale',
    nameTiny: 'DV',
    folder: 'Maps',
    icon: 'MapDrownedValeHex',
  },
  ShackledChasmHex: {
    name: 'Shackled Chasm',
    nameTiny: 'SC',
    folder: 'Maps',
    icon: 'MapShackledChasmHex',
  },
  AcrithiaHex: {
    name: 'Acrithia',
    nameTiny: 'Ac',
    folder: 'Maps',
    icon: 'MapAcrithiaHex',
  },
  // Col 7 -----------------------------------------------------------
  ClansheadValleyHex: {
    name: 'Clanshead Valley',
    nameTiny: 'CV',
    folder: 'Maps',
    icon: 'MapClansheadValleyHex',
  },
  WeatheredExpanseHex: {
    name: 'Weathered Expanse',
    nameTiny: 'WE',
    folder: 'Maps',
    icon: 'MapWeatheredExpanseHex',
  },
  /** New in Naval Update 2023-10-10 */
  ClahstraHex: {
    name: 'The Clahstra',
    nameTiny: 'Clah',
    folder: 'Maps',
    icon: 'MapClahstraHex',
  },
  AllodsBightHex: {
    name: "Allod's Bight",
    nameTiny: 'AB',
    folder: 'Maps',
    icon: 'MapAllodsBightHex',
  },
  TerminusHex: {
    name: 'Terminus',
    nameTiny: 'Term',
    folder: 'Maps',
    icon: 'MapTerminusHex',
  },
  // Col 8 -----------------------------------------------------------
  MorgensCrossingHex: {
    name: "Morgen's Crossing",
    nameTiny: 'MC',
    folder: 'Maps',
    icon: 'MapMorgensCrossingHex',
  },
  /** New in Naval Update 2023-10-10 */
  StlicanShelfHex: {
    name: "Stlican Shelf",
    nameTiny: 'SS',
    folder: 'Maps',
    icon: 'MapStlicanShelfHex',
  },
  /** Moved in Naval Update 2023-10-10 */
  EndlessShoreHex: {
    name: 'Endless Shore',
    nameTiny: 'ES',
    folder: 'Maps',
    icon: 'MapEndlessShoreHex',
  },
  /** New in Naval Update 2023-10-10 */
  ReaversPassHex: {
    name: "Reaver's Pass",
    nameTiny: 'RP',
    folder: 'Maps',
    icon: 'MapReaversPassHex',
  },
  // Col 9 -----------------------------------------------------------
  GodcroftsHex: {
    name: 'Godcrofts',
    nameTiny: 'Gods',
    folder: 'Maps',
    icon: 'MapGodcroftsHex',
  },
  TempestIslandHex: {
    name: 'Tempest Island',
    nameTiny: 'Temp',
    folder: 'Maps',
    icon: 'MapTempestIslandHex',
  },
  TheFingersHex: {
    name: 'The Fingers',
    nameTiny: 'Fin',
    folder: 'Maps',
    icon: 'MapTheFingersHex',
  },
} satisfies Record<HexKeysUnion, {
  name: string,
  nameTiny: string,
  folder: string,
  icon: string,
}>;

export const regionIdToHexKey: Map<number, HexKeysUnion> = new Map([
	// Col 1
	[
		16,
    'OarbreakerHex',
	],
	[
		15,
		'FishermansRowHex',
	],
	[
		48,
		'StemaLandingHex',
	],
	// Col 2
	[
		29,
		'NevishLineHex',
	],
	[
		13,
		'FarranacCoastHex',
	],
	[
		14,
		'WestgateHex',
	],
	[
		42,
		'OriginHex',
	],
	// Col 3
	[
		32,
		'CallumsCapeHex',
	],
	[
		12,
		'StonecradleHex',
	],
	[
		44,
		'KingsCageHex',
	],
	[
		43,
		'SableportHex',
	],
	[
		41,
		'AshFieldsHex',
	],
	// Col 4
	[
		33,
		'SpeakingWoodsHex',
	],
	[
		7,
		'MooringCountyHex',
	],
	[
		10,
		'LinnMercyHex',
	],
	[
		9,
		'LochMorHex',
	],
	[
		8,
		'HeartlandsHex',
	],
	[
		31,
		'RedRiverHex',
	],
	// Col 5
	[
		34,
		'BasinSionnachHex',
	],
	[
		11,
		'ReachingTrailHex',
	],
	[
		4,
		'CallahansPassageHex',
	],
	[
		3,
		'DeadLandsHex',
	],
	[
		6,
		'UmbralWildwoodHex',
	],
	[
		17,
		'GreatMarchHex',
	],
	[
		40,
		'KalokaiHex',
	],
	// Col 6
	[
		35,
		'HowlCountyHex',
	],
	[
		25,
		'ViperPitHex',
	],
	[
		5,
		'MarbanHollow',
	],
	[
		23,
		'DrownedValeHex',
	],
	[
		24,
		'ShackledChasmHex',
	],
	[
		30,
		'AcrithiaHex',
	],
	// Col 7
	[
		36,
		'ClansheadValleyHex',
	],
	[
		22,
		'WeatheredExpanseHex',
	],
	[
		46,
		'ClahstraHex',
	],
	[
		21,
		'AllodsBightHex',
	],
	[
		39,
		'TerminusHex',
	],
	// Col 8
	[
		37,
		'MorgensCrossingHex',
	],
	[
		45,
		'StlicanShelfHex',
	],
	[
		20,
		'EndlessShoreHex',
	],
	[
		47,
		'ReaversPassHex',
	],
	// Col 9
	[
		19,
		'GodcroftsHex',
	],
	[
		18,
		'TempestIslandHex',
	],
	[
		38,
		'TheFingersHex',
  ],
]);