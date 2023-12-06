import React from "react";
import { useUserContext } from "../../model/user/userContext";

const Home = () => {
  const user = useUserContext();

  console.log(user);

  return <div>Dashboard</div>;
};

export default Home;
