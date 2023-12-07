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
  Profile = "/profile",
}

export const NAV_ITEMS = [
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
  {
    label: "Whitelist",
    href: PATH.Whitelist,
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
    label: "Profile",
    href: PATH.Profile,
  },
];
