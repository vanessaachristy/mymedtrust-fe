import { ReactNode } from "react";
import { FaFileMedicalAlt } from "react-icons/fa";
import {
  FaFileMedical,
  FaHouse,
  FaUserCheck,
  FaUserDoctor,
  FaUserGroup,
} from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";
import { IconType } from "react-icons/lib";
import { MdNoFood } from "react-icons/md";
import { PiFileMagnifyingGlassFill } from "react-icons/pi";

export const enum PATH {
  Intro = "/",
  Home = "/home",
  Login = "/login",
  SignUp = "/signup",
  Profile = "/profile",

  // Records
  AllRecords = "/records",

  Observations = "/observations",
  AddObservation = "/observations/add",

  Conditions = "/conditions",
  AddCondition = "/conditions/add",

  Allergies = "/allergies",
  AddAllergy = "/allergy/add",

  Medications = "/medications",
  AddMedication = "/medications/add",

  // Patient
  Patient = "/patients",
  AddPatients = "/patients/add",

  // Doctor
  Doctors = "/doctos",
  AddDoctors = "/doctors/add",

  // Whitelist (for Admin)
  Whitelist = "/whitelist",
}

export type NavItems = {
  label: string;
  href: PATH;
  icon?: IconType;
};

const ALL_NAVS: Record<string, NavItems> = {
  [PATH.Home]: {
    label: "Home",
    href: PATH.Home,
    icon: FaHouse,
  },
  [PATH.AllRecords]: {
    label: "All Records",
    href: PATH.AllRecords,
    icon: FaFileMedical,
  },
  [PATH.Observations]: {
    label: "Observations",
    href: PATH.Observations,
    icon: PiFileMagnifyingGlassFill,
  },
  [PATH.Conditions]: {
    label: "Conditions",
    href: PATH.Conditions,
    icon: FaFileMedicalAlt,
  },
  [PATH.Allergies]: {
    label: "Allergies",
    href: PATH.Allergies,
    icon: MdNoFood,
  },
  [PATH.Medications]: {
    label: "Medications",
    href: PATH.Medications,
    icon: GiMedicinePills,
  },
  [PATH.AddObservation]: {
    label: "Add Observation",
    href: PATH.AddObservation,
    icon: PiFileMagnifyingGlassFill,
  },
  [PATH.AddCondition]: {
    label: "Add Condition",
    href: PATH.AddCondition,
    icon: FaFileMedicalAlt,
  },
  [PATH.AddAllergy]: {
    label: "Add Allergy",
    href: PATH.AddAllergy,
    icon: MdNoFood,
  },
  [PATH.AddMedication]: {
    label: "Add Medication",
    href: PATH.AddMedication,
    icon: GiMedicinePills,
  },
  [PATH.Patient]: {
    label: "Patients",
    href: PATH.Patient,
    icon: FaUserGroup,
  },
  [PATH.Doctors]: {
    label: "Doctors",
    href: PATH.Doctors,
    icon: FaUserDoctor,
  },
  [PATH.Whitelist]: {
    label: "Whitelist",
    href: PATH.Whitelist,
    icon: FaUserCheck,
  },
  [PATH.Profile]: {
    label: "Profile",
    href: PATH.Profile,
  },
};

export const PATIENT_NAV: NavItems[] = [
  ALL_NAVS[PATH.Home],
  ALL_NAVS[PATH.AllRecords],
  ALL_NAVS[PATH.Observations],
  ALL_NAVS[PATH.Conditions],
  ALL_NAVS[PATH.Allergies],
  ALL_NAVS[PATH.Medications],
];

export const DOCTOR_NAV: NavItems[] = [
  ALL_NAVS[PATH.Home],
  ALL_NAVS[PATH.AddObservation],
  ALL_NAVS[PATH.AddCondition],
  ALL_NAVS[PATH.AddAllergy],
  ALL_NAVS[PATH.AddMedication],
  ALL_NAVS[PATH.Patient],
];

export const ADMIN_NAV: NavItems[] = [
  ALL_NAVS[PATH.Home],
  ALL_NAVS[PATH.Patient],
  ALL_NAVS[PATH.Doctors],
  ALL_NAVS[PATH.AllRecords],
];

export const PROFILE_NAV: NavItems[] = [ALL_NAVS[PATH.Profile]];
