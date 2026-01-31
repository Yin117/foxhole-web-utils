import { getObjectValues } from "@/helpers/typescriptHelper";
import { MetaMapDynamic, WarPlatformsRecordFormat } from "@/types/warData";
import wc093 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC093_2022-07-18.json' assert { type: 'json' };
import wc094 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC094_2022-08-09.json' assert { type: 'json' };
import wc095 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC095_2022-09-23.json' assert { type: 'json' };
import wc096 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC096_2022-11-03.json' assert { type: 'json' };
import wc097 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC097_2022-11-21.json' assert { type: 'json' };
import wc098 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC098_2022-12-12.json' assert { type: 'json' };
import wc099 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC099_2022-12-31.json' assert { type: 'json' };
import wc100 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC100_2023-02-27.json' assert { type: 'json' };
import wc101 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC101_2023-03-16.json' assert { type: 'json' };
import wc102 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC102_2023-04-23.json' assert { type: 'json' };
import wc103 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC103_2023-05-23.json' assert { type: 'json' };
import wc104 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC104_2023-06-12.json' assert { type: 'json' };
import wc105 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC105_2023-07-26.json' assert { type: 'json' };
import wc106 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC106_2023-09-15.json' assert { type: 'json' };
import wc107 from './warPlatforms/mapNameRecordFormat/War_Platforms_WC107_2023-10-16.json' assert { type: 'json' };
import wc108 from './metaMapDynamic/Meta_Map_Dynamic_WC108.json' assert { type: 'json' };
import wc109 from './metaMapDynamic/Meta_Map_Dynamic_WC109.json' assert { type: 'json' };
import wc110 from './metaMapDynamic/Meta_Map_Dynamic_WC110.json' assert { type: 'json' };
import wc111 from './metaMapDynamic/Meta_Map_Dynamic_WC111.json' assert { type: 'json' }
import wc112 from './metaMapDynamic/Meta_Map_Dynamic_WC112.json' assert { type: 'json' };
import wc113 from './metaMapDynamic/Meta_Map_Dynamic_WC113.json' assert { type: 'json' };
import wc114 from './metaMapDynamic/Meta_Map_Dynamic_WC114.json' assert { type: 'json' };
import wc115 from './metaMapDynamic/Meta_Map_Dynamic_WC115.json' assert { type: 'json' };
import wc116 from './metaMapDynamic/Meta_Map_Dynamic_WC116.json' assert { type: 'json' };
import wc117 from './metaMapDynamic/Meta_Map_Dynamic_WC117.json' assert { type: 'json' };
import wc118 from './metaMapDynamic/Meta_Map_Dynamic_WC118.json' assert { type: 'json' };
import wc119 from './metaMapDynamic/Meta_Map_Dynamic_WC119.json' assert { type: 'json' };
import wc120 from './metaMapDynamic/Meta_Map_Dynamic_WC120.json' assert { type: 'json' };
import wc121 from './metaMapDynamic/Meta_Map_Dynamic_WC121.json' assert { type: 'json' };
import wc122 from './metaMapDynamic/Meta_Map_Dynamic_WC122.json' assert { type: 'json' };
import wc123 from './metaMapDynamic/Meta_Map_Dynamic_WC123.json' assert { type: 'json' };
import wc124 from './metaMapDynamic/Meta_Map_Dynamic_WC124.json' assert { type: 'json' };
import wc125 from './metaMapDynamic/Meta_Map_Dynamic_WC125.json' assert { type: 'json' };
import wc126 from './metaMapDynamic/Meta_Map_Dynamic_WC126.json' assert { type: 'json' };
import wc127 from './metaMapDynamic/Meta_Map_Dynamic_WC127.json' assert { type: 'json' };
import wc128 from './metaMapDynamic/Meta_Map_Dynamic_WC128.json' assert { type: 'json' };
import wc129 from './metaMapDynamic/Meta_Map_Dynamic_WC129.json' assert { type: 'json' };
import wc130 from './metaMapDynamic/Meta_Map_Dynamic_WC130.json' assert { type: 'json' };
import wc131 from './metaMapDynamic/Meta_Map_Dynamic_WC131.json' assert { type: 'json' };

/**
 * Note, Platforms were recorded by `warPlatforms` while Rockets were recorded by
 * `metaMapDynamic` for a period until the two were merged
 */

// Went with Strings for Keys, incase War Numbers get "exciting" in the future
export const warNumberToMetaMapDynamic = new Map<string, MetaMapDynamic[]>([
  ['131', wc131 as MetaMapDynamic[]],
  ['130', wc130 as MetaMapDynamic[]],
  ['129', wc129 as MetaMapDynamic[]],
  ['128', wc128 as MetaMapDynamic[]],
  ['127', wc127 as MetaMapDynamic[]],
  ['126', wc126 as MetaMapDynamic[]],
  ['125', wc125 as MetaMapDynamic[]],
  ['124', wc124 as MetaMapDynamic[]],
  ['123', wc123 as MetaMapDynamic[]],
  ['122', wc122 as MetaMapDynamic[]],
  ['121', wc121 as MetaMapDynamic[]],
  ['120', wc120 as MetaMapDynamic[]],
  ['119', wc119 as MetaMapDynamic[]],
  ['118', wc118 as MetaMapDynamic[]],
  ['117', wc117 as MetaMapDynamic[]],
  ['116', wc116 as MetaMapDynamic[]],
  ['115', wc115 as MetaMapDynamic[]],
  ['114', wc114 as MetaMapDynamic[]],
  ['113', wc113 as MetaMapDynamic[]],
  ['112', wc112 as MetaMapDynamic[]],
  ['111', wc111 as MetaMapDynamic[]],
  ['110', wc110 as MetaMapDynamic[]],
  ['109', wc109 as MetaMapDynamic[]],
  ['108', wc108 as MetaMapDynamic[]],
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