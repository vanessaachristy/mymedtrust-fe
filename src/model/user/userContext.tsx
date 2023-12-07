import React, { createContext, useContext, useState } from "react";
import { User } from "../../types";
import { UserType } from "../../constants/user";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logoutUser: () => void;
}>({
  user: {
    isLoggedIn: false,
    email: "",
    address: "",
    userType: UserType.PATIENT,
    IC: "",
    name: "",
    gender: "",
    birthdate: "",
    homeAddress: "",
    phone: "",
    userSince: "",
    whitelistedDoctor: [],
    recordList: [],
    emergencyContact: "",
    emergencyContactNumber: "",
    bloodType: "",
    height: 0,
    weight: 0,
    qualification: "",
    degree: "",
  },
  setUser: () => {},
  logoutUser: () => {},
});

export const emptyUser: User = {
  isLoggedIn: false,
  email: "",
  address: "",
  userType: UserType.PATIENT,
  IC: "",
  name: "",
  gender: "",
  birthdate: "",
  homeAddress: "",
  phone: "",
  userSince: "",
  whitelistedDoctor: [],
  recordList: [],
  emergencyContact: "",
  emergencyContactNumber: "",
  bloodType: "",
  height: 0,
  weight: 0,
  qualification: "",
  degree: "",
};
export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>(emptyUser);

  const clearAuthorizationCookie = () => {
    const pastDate = new Date(0);
    document.cookie =
      "Authorization=; expires=" + pastDate.toUTCString() + "; path=/";
  };

  const logoutUser = () => {
    setUser(emptyUser);
    clearAuthorizationCookie();
  };

  const userContextValue = {
    user,
    setUser,
    logoutUser,
  };
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
