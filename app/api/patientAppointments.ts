import {get} from './requestStructure';

const endpoint = 'patient-appointments/';

export async function showPatientAllAppointments(id: string) {
  const res = await get(endpoint + id);
  return res;
}
