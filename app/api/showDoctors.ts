import {get, post} from './requestStructure';

const endpoint = 'show-doctors/';

export async function showDoctors(role: string) {
  const res = await get(endpoint + role);
  return res;
}
export async function showDoctorById(data: {doctor_id: string}) {
  const res = await post(endpoint, data);
  return res;
}
