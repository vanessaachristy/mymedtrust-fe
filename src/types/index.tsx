import { UserType } from "../constants/user";

export type DBMetadatas = {
  _id: string;
  timestamp: string;
  __v: number;
};

export type User = {
  isLoggedIn: boolean;
  email: string;
  address: string;
  userType?: UserType;
  IC?: string;
  name?: string;
  gender?: string;
  birthdate?: string;
  homeAddress?: string;
  phone?: string;
  userSince?: string;
  whitelistedDoctor?: string[];
  recordList?: string[];
  emergencyContact?: string;
  emergencyContactNumber?: string;
  bloodType?: string;
  height?: number;
  weight?: number;
  qualification?: string;
  degree?: string;
};
