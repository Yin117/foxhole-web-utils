import { shards } from "@/consts/foxhole";
import { Shard } from "@/types/api";
import { MapList } from "@/types/warData";
import axios, { AxiosPromise } from "axios";


export async function getMapList(shard: Shard = shards.live1): AxiosPromise<MapList> {
  return axios.get(`${shard.rootURL}/maps`);
}