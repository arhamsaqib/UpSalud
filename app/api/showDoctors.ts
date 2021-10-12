import {get} from './requestStructure';

const endpoint = 'show-doctors/';

export async function showDoctors(role: string) {
  const res = await get(endpoint + role);
  return res;
}
