import {del, get, post} from './requestStructure';
import {BasicInformationInterface} from './interfaces';

const endpoint = 'basic-information/';

export async function storeBasicInformation(data: BasicInformationInterface) {
  const res = await post(endpoint, data);
  return res;
}
export async function showUserBasicInformation(id: string) {
  const res = await get(endpoint + id);
  return res;
}
export async function deleteUserBasicInformation(id: string) {
  const res = await del(endpoint + id);
  return res;
}
