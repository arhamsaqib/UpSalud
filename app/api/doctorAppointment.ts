import {get, post} from './requestStructure';

const endpoint = 'doctor-appointments/';

export async function showDoctorAllAppointments(id: string) {
  const res = await get(endpoint + id);
  return res;
}
export async function showDoctorById(data: {doctor_id: string}) {
  const res = await post(endpoint, data);
  return res;
}
