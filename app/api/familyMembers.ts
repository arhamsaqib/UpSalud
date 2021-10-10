import {del, get, post} from './requestStructure';
import {FamilyMembersInterface} from './interfaces';

const endpoint = 'family-member/';

export async function storeFamilyMember(data: FamilyMembersInterface) {
  const res = await post(endpoint, data);
  return res;
}
export async function showUserAllFamilyMembers(id: string) {
  const res = await get(endpoint + id);
  return res;
}
export async function deleteFamilyMember(id: string) {
  const res = await del(endpoint + id);
  return res;
}
