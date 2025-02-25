import { warNumberToMapDynamic } from "@/consts/warData/mapDynamic";
import { MapDynamic } from "@/types/warData";

export function getMapDynamicForWar(warNumber: string): MapDynamic[] {
  return Array.from(warNumberToMapDynamic.get(warNumber) ?? []);
}