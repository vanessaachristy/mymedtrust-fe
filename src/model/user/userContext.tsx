import React, { createContext, useContext, useState } from "react";
import { User } from "../../types";

export const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}>({
  user: {
    email: "",
    address: "",
  },
  setUser: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    email: "",
    address: "",
  });

  const userContextValue = {
    user,
    setUser,
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
