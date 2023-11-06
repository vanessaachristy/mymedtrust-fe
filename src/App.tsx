import React, { useEffect, useState } from "react";
import "./App.scss";
import Home from "./containers/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./containers/login";
import { JWT_TOKEN_STORAGE } from "./constants/user";
import { ChakraProvider } from "@chakra-ui/react";
import SignUp from "./containers/signup";
import { PATH } from "./constants/user/path";

const router = createBrowserRouter([
  {
    path: PATH.Home,
    element: <Home />,
  },
  {
    path: PATH.Login,
    element: <Login />,
  },
  {
    path: PATH.SignUp,
    element: <SignUp />,
  },
]);

function App() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (window.localStorage.getItem(JWT_TOKEN_STORAGE))
      setToken(window.localStorage.getItem(JWT_TOKEN_STORAGE) ?? "");
  }, []);

  return (
    <ChakraProvider>
      <div className="App">
        {token ? <RouterProvider router={router} /> : <Login />}
      </div>
    </ChakraProvider>
  );
}

export default App;
