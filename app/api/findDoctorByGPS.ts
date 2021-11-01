import {get, post} from './requestStructure';

const endpoint = 'find-doctor-by-gps/';

export async function findAllDoctors() {
  const res = await get(endpoint);
  return res;
}
export async function findDoctorByGPS(data: {lat?: string; lng: string}) {
  const res = await post(endpoint, data);
  return res;
}
