import {get} from './requestStructure';

const endpoint = 'doctor-appointments/';

export async function showDoctorAllAppointments(id: string) {
  const res = await get(endpoint + id);
  return res;
}
