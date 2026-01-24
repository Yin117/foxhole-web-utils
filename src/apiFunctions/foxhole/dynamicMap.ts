import { HexKeysUnion, shards } from "@/consts/foxhole";
import { Shard } from "@/types/api";
import { MapDynamic } from "@/types/warData";
import axios, { AxiosPromise } from "axios";

export async function getCurrentMapDynamicForRegion(shard: Shard = shards.live1, mapName: HexKeysUnion, eTag?: string): AxiosPromise<MapDynamic> {
  return axios.get(`${shard.rootURL}/maps/${mapName}/dynamic/public`, {
    headers: {
      ...(
        eTag ? {
          'If-None-Match': eTag,
        } : {}
      ),
    },
  });
}