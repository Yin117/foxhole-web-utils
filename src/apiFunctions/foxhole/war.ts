import { shards } from "@/consts/foxhole";
import { Shard } from "@/types/api";
import { WarState } from "@/types/warData";
import axios, { AxiosPromise } from "axios";




export async function getCurrentWarState(shard: Shard = shards.live1): AxiosPromise<WarState> {
  return axios.get(`${shard.rootURL}/war`);
}