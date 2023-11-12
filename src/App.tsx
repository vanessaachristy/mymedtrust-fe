import React, { useEffect, useState } from "react";
import "./App.scss";
import Home from "./containers/home";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
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
import Whitelist from "./containers/whitelist";
import AddObservation from "./containers/add-observation";

const router = createBrowserRouter([
  {
    path: PATH.Login,
    element: <Login />,
  },
  {
    path: PATH.SignUp,
    element: <SignUp />,
  },
  {
    path: PATH.Home,
    element: <Home />,
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
  {
    path: PATH.Whitelist,
    element: <Whitelist />,
  },
  {
    path: PATH.AddObservation,
    element: <AddObservation />,
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

  const showNavBar =
    window.location.pathname !== PATH.Login &&
    window.location.pathname !== PATH.SignUp;

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="App">
          {showNavBar && <NavBar />}
          <RouterProvider router={router} />
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
