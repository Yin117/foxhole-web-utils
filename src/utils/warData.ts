import { warNumberToMapDynamic } from "@/consts/warData/mapDynamic";

export function getMapDynamicForWar(warNumber: string) {
  return warNumberToMapDynamic.get(warNumber);
}