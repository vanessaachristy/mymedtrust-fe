import React, { useEffect, useState } from "react";
import "./App.scss";
import Home from "./containers/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./containers/login";
import { JWT_TOKEN_STORAGE } from "./constants/user";
import { ChakraProvider } from "@chakra-ui/react";
import SignUp from "./containers/signup";
import { PATH } from "./constants/path";
import { QueryClient, QueryClientProvider } from "react-query";
import NavBar from "./components/NavBar";
import Observations from "./containers/observations";
import Allergies from "./containers/allergies";
import Conditions from "./containers/conditions";

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
  {
    path: PATH.Observations,
    element: <Observations />,
  },
  {
    path: PATH.Allergies,
    element: <Allergies />,
  },
  {
    path: PATH.Conditions,
    element: <Conditions />,
  },
]);

function App() {
  const [token, setToken] = useState<string>("");
  const queryClient = new QueryClient();

  useEffect(() => {
    if (window.localStorage.getItem(JWT_TOKEN_STORAGE))
      setToken(window.localStorage.getItem(JWT_TOKEN_STORAGE) ?? "");
  }, []);

  useEffect(() => {
    if (!token) {
      return () => {
        <Login />;
      };
    }
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="App">
          <NavBar />
          <RouterProvider router={router} />
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
