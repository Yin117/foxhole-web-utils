import { WarState } from "@/types/warData";
import axios, { AxiosPromise } from "axios";




export async function getCurrentWarState(): AxiosPromise<WarState> {
  return axios.get(`https://war-service-live.foxholeservices.com/api/worldconquest/war`);
}