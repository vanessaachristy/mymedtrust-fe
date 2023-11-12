export const enum PATH {
  Home = "/",
  Login = "/login",
  SignUp = "/signup",
  Observations = "/observations",
  Conditions = "/conditions",
  Allergies = "/allergies",
  Whitelist = "/whitelist",
  AddObservation = "/observations/add",
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
    label: "Whitelist",
    href: PATH.Whitelist,
  },
  {
    label: "Add Observation",
    href: PATH.AddObservation,
  },
];
