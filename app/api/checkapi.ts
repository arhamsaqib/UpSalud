import {get} from './requestStructure';

const endpoint = 'checkapi/';

export async function CheckApi() {
  const res = await get(endpoint);
  return res;
}
