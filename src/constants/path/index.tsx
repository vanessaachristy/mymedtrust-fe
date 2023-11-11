export const enum PATH {
  Home = "/",
  Login = "/login",
  SignUp = "/signup",
  Observations = "/observations",
  Conditions = "/conditions",
  Allergies = "/allergies",
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
];
