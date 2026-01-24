import { getObjectEntries } from "@/helpers/typescriptHelper";
import { TeamId } from "@/types/warData";
import { Shard, ShardKeys } from "@/types/api";
import { warNumberToMapDynamic } from "./warData/mapDynamic";



export const shards: Record<ShardKeys, Shard> = {
  live1: {
    name: 'Able',
    rootURL: 'https://war-service-live.foxholeservices.com/api/worldconquest',
  },
  live2: {
    name: 'Baker',
    rootURL: 'https://war-service-live-2.foxholeservices.com/api/worldconquest',
  },
  live3: {
    name: 'Charlie',
    rootURL: 'https://war-service-live-3.foxholeservices.com/api/worldconquest',
  },
  devBranch: {
    name: 'Dev-Branch',
    rootURL: 'https://war-service-dev.foxholeservices.com/api/worldconquest',
  },
}

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

type Faction = {
  mapItemKey?: string;
  label: string;
  labelPlural: string;
  imageSrc?: string;
  fill: string;
  rgb: {
    red: number,
    green: number,
    blue: number,
  }
}

export const factions: Record<'none' | 'wardens' | 'colonials' | 'both', Faction> = {
  none: {
    mapItemKey: 'NONE',
    label: 'Netural',
    labelPlural: 'Netural',
    imageSrc: undefined,
    fill: '#FFFFFF',
    rgb: {
      red: 255,
      green: 255,
      blue: 255,
    },
  },
  wardens: {
    mapItemKey: 'WARDENS',
    label: 'Warden',
    labelPlural: 'Wardens',
    imageSrc: "/foxhole-web-utils/images/Factions/Warden.png",
    fill: '#245682',
    rgb: {
      red: 45,
      green: 107,
      blue: 161,
    },
  },
  colonials: {
    mapItemKey: 'COLONIALS',
    label: 'Colonial',
    labelPlural: 'Colonials',
    imageSrc: "/foxhole-web-utils/images/Factions/Colonial.png",
    fill: '#516c4b',
    rgb: {
      red: 99,
      green: 132,
      blue: 94,
    },
  },
  both: {
    mapItemKey: undefined,
    label: 'Both',
    labelPlural: 'Both',
    imageSrc: "/foxhole-web-utils/images/Factions/WardenAndColonial.png",
    fill: '#3b6167',
    rgb: {
      red: 59,
      green: 97,
      blue: 103,
    },
  },
};

export const factionForKey = (key: TeamId) => {
  return getObjectEntries(factions).find(([, value]) => value.mapItemKey === key);
}

export const factionKeyToProp = (key: TeamId) => {
  if (key === 'COLONIALS') {
    return 'colonials';
  }
  if (key === 'WARDENS') {
    return 'wardens';
  }
  return 'none';
}


const warNumbersDraft = [''].slice(0, 0) satisfies string[];
warNumberToMapDynamic.forEach((value, key) => {
  warNumbersDraft.push(key);
});
warNumbersDraft.reverse();
export const warNumbers = warNumbersDraft;


type MapItemDetail = {
  isUndocumented?: boolean,
  isUnexpectedInAPI?: boolean,
  name: string,
  friendlyName?: string,
  folder?: string,
  iconFunc?: (teamId?: TeamId) => string,
  isMapBase?: boolean,
  isNeutral?: boolean,
  isRocketType?: boolean,
  isRocketSiteEither?: boolean,
  isRocketSite?: boolean,
  isScoreBase?: boolean,
  doNotTint?: boolean,
  isStormCannon?: boolean,
  isIntelCenter?: boolean,
  isPlatform?: boolean,
  isAirRadar?: boolean,
  isBunker?: boolean,
  isResource?: boolean,
  isPlayerBuilt?: boolean,
};

export const iconTypeToMapDetail: Record<number, Partial<MapItemDetail>> = {
  5: {
    isUnexpectedInAPI: true,
    name: 'StaticBase1', // Removed in v0.46
  },
  6: {
    isUnexpectedInAPI: true,
    name: 'StaticBase2', // Removed in v0.46
  },
  7: {
    isUnexpectedInAPI: true,
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
    isUnexpectedInAPI: true,
    name: 'Armory', // Old (Special Ammo)
  },
  14: {
    isUnexpectedInAPI: true,
    name: 'Supply Station',
  },
  15: {
    isUnexpectedInAPI: true,
    name: 'Workshop', // Old: crossed Wrenches?
  },
  16: {
    isUnexpectedInAPI: true,
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
    isUnexpectedInAPI: true,
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
    isUnexpectedInAPI: true,
    name: 'World Map Tent',
  },
  25: {
    isUnexpectedInAPI: true,
    name: 'Travel Tent',
  },
  26: {
    isUnexpectedInAPI: true,
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
    isUnexpectedInAPI: true,
    name: 'Troop Ship',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconTroopShip',
    isPlayerBuilt: true,
  },
  31: {
    isUnexpectedInAPI: true,
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
    isUnexpectedInAPI: true,
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
    isUnexpectedInAPI: true,
    name: 'Oil Well (old)',
    friendlyName: 'Oil Well (old)',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconFuel',
    isResource: true,
  },
  42: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-42',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  43: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-43',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  44: {
    isUnexpectedInAPI: true,
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
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'BOB', // T1?
    folder: 'MapIcons',
    iconFunc: () => 'MapIconBunkerBaseTier1',
    isBunker: true,
    isPlayerBuilt: true,
  },
  49: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'BOB', // T2?
    folder: 'MapIcons',
    iconFunc: () => 'MapIconBunkerBaseTier2',
    isBunker: true,
    isPlayerBuilt: true,
  },
  50: {
    isUnexpectedInAPI: true,
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
    isUnexpectedInAPI: true,
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
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-63',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  64: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-64',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  65: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-65',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  67: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-67',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  68: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-68',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  69: {
    isUnexpectedInAPI: true,
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
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-73',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  74: {
    isUnexpectedInAPI: true,
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
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-76',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  77: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-77',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  78: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-78',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  79: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-79',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  80: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-80',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  81: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-81',
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  82: {
    isUnexpectedInAPI: true,
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
  },

  85: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-85', // Likly Resource Transfer 4
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  86: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-86', // Likly Facility Small Arms Factory
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },
  87: {
    isUnexpectedInAPI: true,
    isUndocumented: true,
    name: 'UNK-87', // Likly  Fort Garrison Station
    folder: 'MapIcons',
    iconFunc: () => 'MapIconUNKNOWN',
  },

  88: {
    name: 'Aircraft Depot', // Airborne Update
    folder: 'MapIcons',
    iconFunc: () => 'MapiIconAircraftDepot',
  },

  89: {
    isUnexpectedInAPI: true,
    name: 'Aircraft Hanger', // aka Air Factory // Airborne Update
    folder: 'MapIcons',
    iconFunc: () => 'MapiIconAircraftFactory',
  },

  90: {
    name: 'Aerial Interceptor Array', // Airborne Update
    folder: 'MapIcons',
    iconFunc: () => 'MapIconFortLargeRadar',
    isAirRadar: true,
  },

  91: {
    isUnexpectedInAPI: true,
    name: 'Aircraft Runway T1', // Airborne Update
    folder: 'MapIcons',
    iconFunc: () => 'MapiIconAircraftRunwayT1',
  },

  92: {
    isUnexpectedInAPI: true,
    name: 'Aircraft Runway T2', // Airborne Update
    folder: 'MapIcons',
    iconFunc: () => 'MapiIconAircraftRunwayT2',
  },
};

export const getMapItemDetail = (iconType: number): Partial<MapItemDetail> | undefined => {
  return iconTypeToMapDetail[iconType];
}



export enum HexKeys {
  // Col 1
  'OlavisWakeHex' = 'OlavisWakeHex', // UNCONFIRMED NAME

  // Col 2
  'PariPeakHex' = 'PariPeakHex', // UNCONFIRMED NAME
  'PalantineBermHex' =  'PalantineBermHex', // UNCONFIRMED NAME
  'OarbreakerHex' = 'OarbreakerHex',

  // Col 3
  'KurraStrandHex' = 'KurraStrandHex', // UNCONFIRMED NAME
  'TheGutterHex' = 'TheGutterHex', // UNCONFIRMED NAME
  'FishermansRowHex' = 'FishermansRowHex',
  'StemaLandingHex' = 'StemaLandingHex',

  // Col 4
  'NevishLineHex' = 'NevishLineHex',
  'FarranacCoastHex' = 'FarranacCoastHex',
  'WestgateHex' = 'WestgateHex',
  'OriginHex' = 'OriginHex',
  // Col 5
  'CallumsCapeHex' = 'CallumsCapeHex',
  'StonecradleHex' = 'StonecradleHex',
  'KingsCageHex' = 'KingsCageHex',
  'SableportHex' = 'SableportHex',
  'AshFieldsHex' = 'AshFieldsHex',
  // Col 6
  'SpeakingWoodsHex' = 'SpeakingWoodsHex',
  'MooringCountyHex' = 'MooringCountyHex',
  'LinnMercyHex' = 'LinnMercyHex',
  'LochMorHex' = 'LochMorHex',
  'HeartlandsHex' = 'HeartlandsHex',
  'RedRiverHex' = 'RedRiverHex',
  // Col 7
  'BasinSionnachHex' = 'BasinSionnachHex',
  'ReachingTrailHex' = 'ReachingTrailHex',
  'CallahansPassageHex' = 'CallahansPassageHex',
  'DeadLandsHex' = 'DeadLandsHex',
  'UmbralWildwoodHex' = 'UmbralWildwoodHex',
  'GreatMarchHex' = 'GreatMarchHex',
  'KalokaiHex' = 'KalokaiHex',
  // Col 8
  'HowlCountyHex' = 'HowlCountyHex',
  'ViperPitHex' = 'ViperPitHex',
  'MarbanHollow' = 'MarbanHollow', /** Is Correctly Different */
  'DrownedValeHex' = 'DrownedValeHex',
  'ShackledChasmHex' = 'ShackledChasmHex',
  'AcrithiaHex' = 'AcrithiaHex',
  // Col 9
  'ClansheadValleyHex' = 'ClansheadValleyHex',
  'WeatheredExpanseHex' = 'WeatheredExpanseHex',
  'ClahstraHex' = 'ClahstraHex',
  'AllodsBightHex' = 'AllodsBightHex',
  'TerminusHex' = 'TerminusHex',
  // Col 10
  'MorgensCrossingHex' = 'MorgensCrossingHex',
  'StlicanShelfHex' = 'StlicanShelfHex',
  'EndlessShoreHex' = 'EndlessShoreHex',
  'ReaversPassHex' = 'ReaversPassHex',

  // Col 11
  'GodcroftsHex' = 'GodcroftsHex',
  'TempestIslandHex' = 'TempestIslandHex',
  'WrestaHex' = 'WrestaHex', // UNCONFIRMED NAME
  'OnyxHex' = 'OnyxHex', // UNCONFIRMED NAME
  
  // Col 12
  'LykosIsleHex' = 'LykosIsleHex', // UNCONFIRMED NAME
  'TheFingersHex' = 'TheFingersHex',
  'TyrantFoothillsHex' = 'TyrantFoothillsHex', // UNCONFIRMED NAME

  // Col 13
  'PipersEnclaveHex' = 'PipersEnclaveHex', // UNCONFIRMED NAME
};
export type HexKeysUnion = `${HexKeys}`;

export type HexInfo = {
  isUndocumented?: boolean,
  name: string,
  nameTiny: string,
  folder: string,
  icon: string,
};

export const hexInfo: Record<HexKeysUnion, HexInfo> = {
  // Col 1 -----------------------------------------------------------
  // Added Feb 2026
  [HexKeys.OlavisWakeHex]: {
    isUndocumented: true,
    name: `Olavi's Wake`,
    nameTiny: 'OW',
    folder: 'Maps',
    icon: 'MapOlavisWakeHex',
  },
  // Col 2 -----------------------------------------------------------
  // Added Feb 2026
  [HexKeys.PariPeakHex]: {
    isUndocumented: true,
    name: 'Pari Peak',
    nameTiny: 'PP',
    folder: 'Maps',
    icon: 'MapPariPeakHex',
  },
  [HexKeys.PalantineBermHex]: {
    isUndocumented: true,
    name: 'Palantine Berm',
    nameTiny: 'PB',
    folder: 'Maps',
    icon: 'MapPalantineBermHex',
  },
  /** Restored and Changed in Naval Update 2023-10-10 */
  OarbreakerHex: {
    name: 'Oarbreaker Isles',
    nameTiny: 'OB',
    folder: 'Maps',
    icon: 'MapOarbreakerHex',
  },

  // Col 3 -----------------------------------------------------------
  // Added Feb 2026
  [HexKeys.KurraStrandHex]: {
    isUndocumented: true,
    name: 'Kurra Strand',
    nameTiny: 'KS',
    folder: 'Maps',
    icon: 'MapKuuraStrandHex',
  },
  
  [HexKeys.TheGutterHex]: {
    isUndocumented: true,
    name: 'The Gutter',
    nameTiny: 'Gut',
    folder: 'Maps',
    icon: 'MapTheGutterHex',
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
  // Col 4 -----------------------------------------------------------
  NevishLineHex: {
    isUndocumented: true,
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
  // Col 5 -----------------------------------------------------------
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
  // Col 6 -----------------------------------------------------------
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
  // Col 7 -----------------------------------------------------------
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
  // Col 8 -----------------------------------------------------------
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
  // Col 9 -----------------------------------------------------------
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
  // Col 10 -----------------------------------------------------------
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
  // Col 11 -----------------------------------------------------------
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
  // Added Feb 2026
  [HexKeys.WrestaHex]: {
    isUndocumented: true,
    name: 'Wresta',
    nameTiny: 'Wr',
    folder: 'Maps',
    icon: 'MapWrestaHex',
  },
  [HexKeys.OnyxHex]: {
    isUndocumented: true,
    name: 'Onyx',
    nameTiny: 'Ox',
    folder: 'Maps',
    icon: 'MapOnyxHex',
  },
  // Col 12 -----------------------------------------------------------
  [HexKeys.LykosIsleHex]: {
    isUndocumented: true,
    name: 'Lykos Isle',
    nameTiny: 'LI',
    folder: 'Maps',
    icon: 'MapLykosIsleHex',
  },
  TheFingersHex: {
    name: 'The Fingers',
    nameTiny: 'Fin',
    folder: 'Maps',
    icon: 'MapTheFingersHex',
  },
  [HexKeys.TyrantFoothillsHex]: {
    isUndocumented: true,
    name: 'Tyrant Foothills',
    nameTiny: 'TF',
    folder: 'Maps',
    icon: 'MapTyrantFoothillsHex',
  },
  // Col 13 -----------------------------------------------------------
  [HexKeys.PipersEnclaveHex]: {
    isUndocumented: true,
    name: `Piper's Enclave`,
    nameTiny: 'PE',
    folder: 'Maps',
    icon: 'MapPipersEnclaveHex',
  },
};

const regionIdToHexKeyEntries: [number, HexKeysUnion][] = [
	// Col 1
  [
    9001,
    HexKeys.OlavisWakeHex,
  ],
  // Col 2
  [
    9002,
    HexKeys.PariPeakHex,
  ],
  [
    9003,
    HexKeys.PalantineBermHex,
  ],
  // Col 3
	[
		16,
    'OarbreakerHex',
	],
  [
    9004,
    HexKeys.KurraStrandHex,
  ],
  [
    9005,
    HexKeys.TheGutterHex,
  ],
	[
		15,
		'FishermansRowHex',
	],
	[
		48,
		'StemaLandingHex',
	],
	// Col 4
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
	// Col 5
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
	// Col 6
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
	// Col 7
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
	// Col 8
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
	// Col 9
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
	// Col 10
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
	// Col 11
	[
		19,
		'GodcroftsHex',
	],
	[
		18,
		'TempestIslandHex',
	],
  [
    9006,
    HexKeys.WrestaHex,
  ],
  [
    9007,
    HexKeys.OnyxHex,
  ],
  [
    9008,
    HexKeys.LykosIsleHex,
  ],
  [
		38,
		'TheFingersHex',
  ],
  [
    9009,
    HexKeys.TyrantFoothillsHex,
  ],
  // Col 13
  [
    9010,
    HexKeys.PipersEnclaveHex,
  ],
];
export const regionIdToHexKey: Map<number, HexKeysUnion> = new Map(regionIdToHexKeyEntries);

export enum StructureKeys {
  stormCannon = 'stormCannon',
  intelCenter = 'intelCenter',
  weatherStation = 'weatherStation',
  airRadar    = 'airRadar',
}
type StructureKey = `${StructureKeys}`;

export const structureToIconType: Record<StructureKey, number> = {
  stormCannon: 59,
  intelCenter: 60,
  weatherStation: 83,
  airRadar: 90,
}

export const structureToMapDetail: Record<StructureKey, Partial<MapItemDetail>> = {
  stormCannon: iconTypeToMapDetail[structureToIconType.stormCannon],
  intelCenter: iconTypeToMapDetail[structureToIconType.intelCenter],
  weatherStation: iconTypeToMapDetail[structureToIconType.weatherStation],
  airRadar:    iconTypeToMapDetail[structureToIconType.airRadar],
}