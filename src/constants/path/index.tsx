export const enum PATH {
  Home = "/",
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
};

export const PATIENT_NAV: NavItems[] = [
  {
    label: "Home",
    href: PATH.Home,
  },
  {
    label: "All Records",
    href: PATH.AllRecords,
  },
  {
    label: "Observations",
    href: PATH.Observations,
  },
  {
    label: "Conditions",
    href: PATH.Conditions,
  },
  {
    label: "Allergies",
    href: PATH.Allergies,
  },
  {
    label: "Medications",
    href: PATH.Medications,
  },
];

export const DOCTOR_NAV: NavItems[] = [
  {
    label: "Home",
    href: PATH.Home,
  },
  {
    label: "Add Observation",
    href: PATH.AddObservation,
  },
  {
    label: "Add Condition",
    href: PATH.AddCondition,
  },
  {
    label: "Add Allergy",
    href: PATH.AddAllergy,
  },
  {
    label: "Add Medication",
    href: PATH.AddMedication,
  },
  {
    label: "Patients",
    href: PATH.Patient,
  },
];

export const ADMIN_NAV: NavItems[] = [
  {
    label: "Home",
    href: PATH.Home,
  },
  {
    label: "Patients",
    href: PATH.Patient,
  },
  {
    label: "Doctors",
    href: PATH.Doctors,
  },
  {
    label: "Whitelist",
    href: PATH.Whitelist,
  },
];

export const PROFILE_NAV: NavItems[] = [
  {
    label: "Profile",
    href: PATH.Profile,
  },
];
