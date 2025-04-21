import { HexKeysUnion } from "@/consts/foxhole";
import { MapDynamic } from "@/types/warData";
import axios, { AxiosPromise } from "axios";




export async function getCurrentMapDynamicForRegion(mapName: HexKeysUnion, eTag?: string): AxiosPromise<MapDynamic> {
  return axios.get(`https://war-service-live.foxholeservices.com/api/worldconquest/maps/${mapName}/dynamic/public`, {
    headers: {
      ...(
        eTag ? {
          'If-None-Match': eTag,
        } : {}
      ),
    },
  });
}