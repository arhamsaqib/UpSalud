export interface User {
  name: string;
  email: string;
  fuid: string; //Firebase User Id
  role: 'patient | doctor';
}

export interface BasicInformation {
  fname: string;
  lname: string;
  uid: string;
  dob: string;
  id_number: string;
}

export interface FamilyMembers {
  uid: string;
  fname: string;
  lname: string;
  relation: string;
  age: string;
  dob: string;
  id_number: string;
}

export interface Appointments {
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
  status: 'cancelled | active | completed | pending';
}
