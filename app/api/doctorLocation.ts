import {get, post} from './requestStructure';

const endpoint = 'doctor-information/';

export async function showDoctorInformationById(id: string) {
  const res = await get(endpoint + id);
  return res;
}

interface PostReq {
  doctor_id: string;
  speciality?: string;
  permanent_lat: string;
  permanent_lng: string;
  temp_lat?: string;
  temp_lng?: string;
}

export async function saveDoctorInformation(data: PostReq) {
  const res = await post(endpoint, data);
  return res;
}
