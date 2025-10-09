import { getObjectValues } from "@/helpers/typescriptHelper";
import { MetaMapDynamic, WarPlatforms, WarPlatformsRecordFormat } from "@/types/warData";
import * as wc093 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC093_2022-07-18.json';
import * as wc094 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC094_2022-08-09.json';
import * as wc095 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC095_2022-09-23.json';
import * as wc096 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC096_2022-11-03.json';
import * as wc097 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC097_2022-11-21.json';
import * as wc098 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC098_2022-12-12.json';
import * as wc099 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC099_2022-12-31.json';
import * as wc100 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC100_2023-02-27.json';
import * as wc101 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC101_2023-03-16.json';
import * as wc102 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC102_2023-04-23.json';
import * as wc103 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC103_2023-05-23.json';
import * as wc104 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC104_2023-06-12.json';
import * as wc105 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC105_2023-07-26.json';
import * as wc106 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC106_2023-09-15.json';
import * as wc107 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC107_2023-10-16.json';
import * as wc108 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC108_2023-12-02.json';

import { warNumberToMetaMapDynamic as metaMapDynamic } from "./metaMapDynamic";
/**
 * Note, Platforms were recorded by `warPlatforms` while Rockets were recorded by
 * `metaMapDynamic` for a period until the two were merged
 */

// Went with Strings for Keys, incase War Numbers get "exciting" in the future
export const warNumberToMetaMapDynamic = new Map<string, MetaMapDynamic[]>([
  ...metaMapDynamic.entries(),
  
  ['108', warPlatformsRecordToMeta(wc108 as unknown as WarPlatformsRecordFormat)],
  ['107', warPlatformsRecordToMeta(wc107 as unknown as WarPlatformsRecordFormat)],
  ['106', warPlatformsRecordToMeta(wc106 as unknown as WarPlatformsRecordFormat)],
  ['105', warPlatformsRecordToMeta(wc105 as unknown as WarPlatformsRecordFormat)],
  ['104', warPlatformsRecordToMeta(wc104 as unknown as WarPlatformsRecordFormat)],
  ['103', warPlatformsRecordToMeta(wc103 as unknown as WarPlatformsRecordFormat)],
  ['102', warPlatformsRecordToMeta(wc102 as unknown as WarPlatformsRecordFormat)],
  ['101', warPlatformsRecordToMeta(wc101 as unknown as WarPlatformsRecordFormat)],
  ['100', warPlatformsRecordToMeta(wc100 as unknown as WarPlatformsRecordFormat)],
  ['99',  warPlatformsRecordToMeta(wc099 as unknown as WarPlatformsRecordFormat)],
  ['98',  warPlatformsRecordToMeta(wc098 as unknown as WarPlatformsRecordFormat)],
  ['97',  warPlatformsRecordToMeta(wc097 as unknown as WarPlatformsRecordFormat)],
  ['96',  warPlatformsRecordToMeta(wc096 as unknown as WarPlatformsRecordFormat)],
  ['95',  warPlatformsRecordToMeta(wc095 as unknown as WarPlatformsRecordFormat)],
  ['94',  warPlatformsRecordToMeta(wc094 as unknown as WarPlatformsRecordFormat)],
  ['93',  warPlatformsRecordToMeta(wc093 as unknown as WarPlatformsRecordFormat)],
]);

function warPlatformsRecordToMeta(warPlatformsRecord: WarPlatformsRecordFormat): MetaMapDynamic[] {
  return getObjectValues(warPlatformsRecord).map(rec => {
    return {
      inserted: rec.inserted,
      mapName: rec.mapName,
      platforms: rec.platforms,
      rocketGroundZeros: [],
      rocketSites: [],
      rocketTargets: [],
    };
  })
}

// function warPlatformToMeta(warPlatforms: WarPlatforms): MetaMapDynamic[] {
//   return warPlatforms.map(rec => {
//     return {
//       inserted: rec.inserted,
//       mapName: rec.mapName,
//       platforms: rec.platforms,
//       rocketGroundZeros: [],
//       rocketSites: [],
//       rocketTargets: [],
//     }
//   })
// }