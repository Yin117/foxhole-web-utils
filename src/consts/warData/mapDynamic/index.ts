import { mapDynamic } from '@/types/warData';
import * as wc099 from './Map_Dynamic_WC099.json';
import * as wc100 from './Map_Dynamic_WC100.json';
import * as wc101 from './Map_Dynamic_WC101.json';
import * as wc102 from './Map_Dynamic_WC102.json';
import * as wc103 from './Map_Dynamic_WC103.json';
import * as wc104 from './Map_Dynamic_WC104.json';
import * as wc105 from './Map_Dynamic_WC105.json';
import * as wc106 from './Map_Dynamic_WC106.json';
import * as wc107 from './Map_Dynamic_WC107.json';
import * as wc108 from './Map_Dynamic_WC108.json';
import * as wc109 from './Map_Dynamic_WC109.json';
import * as wc110 from './Map_Dynamic_WC110.json';
import * as wc111 from './Map_Dynamic_WC111.json';
import * as wc112 from './Map_Dynamic_WC112.json';
import * as wc113 from './Map_Dynamic_WC113.json';
import * as wc114 from './Map_Dynamic_WC114.json';
import * as wc115 from './Map_Dynamic_WC115.json';
import * as wc116 from './Map_Dynamic_WC116.json';
import * as wc117 from './Map_Dynamic_WC117.json';
import * as wc118 from './Map_Dynamic_WC118.json';
import * as wc119 from './Map_Dynamic_WC119.json';
import * as wc120 from './Map_Dynamic_WC120.json';
import * as wc121 from './Map_Dynamic_WC121.json';

// Went with Strings for Keys, incase War Numbers get "exciting" in the future
export const warNumberToMapDynamic = new Map<string, mapDynamic[]>([
  ['99',  wc099 as mapDynamic[]],
  ['100', wc100 as mapDynamic[]],
  ['101', wc101 as mapDynamic[]],
  ['102', wc102 as mapDynamic[]],
  ['103', wc103 as mapDynamic[]],
  ['104', wc104 as mapDynamic[]],
  ['105', wc105 as mapDynamic[]],
  ['106', wc106 as mapDynamic[]],
  ['107', wc107 as mapDynamic[]],
  ['108', wc108 as mapDynamic[]],
  ['109', wc109 as mapDynamic[]],
  ['110', wc110 as mapDynamic[]],
  ['111', wc111 as mapDynamic[]],
  ['112', wc112 as mapDynamic[]],
  ['113', wc113 as mapDynamic[]],
  ['114', wc114 as mapDynamic[]],
  ['115', wc115 as mapDynamic[]],
  ['116', wc116 as mapDynamic[]],
  ['117', wc117 as mapDynamic[]],
  ['118', wc118 as mapDynamic[]],
  ['119', wc119 as mapDynamic[]],
  ['120', wc120 as mapDynamic[]],
  ['121', wc121 as mapDynamic[]],
]);
