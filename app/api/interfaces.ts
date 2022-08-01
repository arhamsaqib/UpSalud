export interface UserInterface {
  name: string;
  email: string;
  fuid: string; //Firebase User Id
  role: 'patient | doctor';
  status?: string;
}

export interface BasicInformationInterface {
  fname: string;
  lname: string;
  uid: string;
  dob: string;
  id_number: string;
}

export interface FamilyMembersInterface {
  uid: string;
  fname: string;
  lname: string;
  relation: string;
  age: string;
  dob: string;
  id_number: string;
}

export interface AppointmentsInterface {
  reason: string;
  emergency?: boolean;
  uid: string;
  doctor_id: string;
  status: string;
  date: string;
  lat?: string;
  lng?: string;
}

export interface UpdateAppointment {
  status: 'cancelled' | 'active' | 'completed' | 'pending';
}
