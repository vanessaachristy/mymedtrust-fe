export const enum PATH {
  Home = "/",
  Login = "/login",
  SignUp = "/signup",
  Observations = "/observations",
  Conditions = "/conditions",
  Allergies = "/allergies",
  Medications = "/medications",
  Whitelist = "/whitelist",
  AddObservation = "/observations/add",
  AddCondition = "/conditions/add",
  AddAllergy = "/allergy/add",
  AddMedication = "/medications/add",
  Profile = "/profile",
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
];

export const ADMIN_NAV: NavItems[] = [
  {
    label: "Home",
    href: PATH.Home,
  },
];

export const PROFILE_NAV: NavItems[] = [
  {
    label: "Profile",
    href: PATH.Profile,
  },
];
