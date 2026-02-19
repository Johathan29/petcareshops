export interface Role {
  id: string;
  name: "admin" | "doctor" | "user";
}

export interface Profile {
  id: string;
  full_name: string;
  role_id: string;
  roles?: Role;
}

export interface Pet {
  id: string;
  name: string;
  age: number;
  breed: string;
  description: string;
  image: string;
  status: "available" | "pending" | "adopted";
}

export interface Adoption {
  id: string;
  pet_id: string;
  user_id: string;
  status: "pending" | "approved" | "rejected";
}

export interface Doctor {
  id: string;
  specialty: string;
  bio: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Appointment {
  id: string;
  user_id: string;
  doctor_id: string;
  service_id: string;
  date: string;
  status: "scheduled" | "completed" | "cancelled";
}
