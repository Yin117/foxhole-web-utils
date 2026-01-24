import { shards } from "@/consts/foxhole";
import { Shard } from "@/types/api";
import { MapList } from "@/types/warData";
import axios, { AxiosPromise } from "axios";


export async function getMapList(shard: Shard = shards.live1): AxiosPromise<MapList> {
  const res = await axios.get(`${shard.rootURL}/maps`);
  // res.data.push('UNKNOWN');
  return res;
}