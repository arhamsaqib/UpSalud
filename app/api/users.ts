import {del, get, post} from './requestStructure';
import {UserInterface} from './interfaces';

const endpoint = 'user/';

export async function createUser(data: UserInterface) {
  const res = await post(endpoint, data);
  return res;
}
export async function showUser(id: string) {
  const res = await get(endpoint + id);
  return res;
}
export async function deleteUser(id: string) {
  const res = await del(endpoint + id);
  return res;
}
