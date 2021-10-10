import {get, post, put} from './requestStructure';
import {AppointmentsInterface, UpdateAppointment} from './interfaces';

const endpoint = 'appointments/';

export async function makeAppointment(data: AppointmentsInterface) {
  const res = await post(endpoint, data);
  return res;
}
export async function updateAppointment(id: string, data: UpdateAppointment) {
  const res = await put(endpoint + id, data);
  return res;
}
export async function showAppointmentDetails(id: string) {
  const res = await get(endpoint + id);
  return res;
}
