import {get, post} from './requestStructure';

const endpoint = 'patient-appointments/';

export async function showPatientAllAppointments(id: string) {
  const res = await get(endpoint + id);
  return res;
}
export async function showPatientById(data: {patient_id: string}) {
  const res = await post(endpoint, data);
  return res;
}
