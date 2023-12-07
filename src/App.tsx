import React, { useEffect, useState } from "react";
import "./App.scss";
import Home from "./containers/home";
import {
  createBrowserRouter,
  Navigate,
  BrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";
import Login from "./containers/login";
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
import { UserProvider, useUserContext } from "./model/user/userContext";
import { CookiesProvider, useCookies } from "react-cookie";
import Medications from "./containers/medications";
import AddCondition from "./containers/add-condition";
import Profile from "./containers/profile";

function App() {
  const queryClient = new QueryClient();

  const [cookies, setCookie] = useCookies(["Authorization"]);
  const [authenticated, setAuthenticated] = useState(
    cookies.Authorization ? true : false
  );

  useEffect(() => {
    if (cookies.Authorization) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [cookies]);

  const ProtectedRoute = ({ children }: any) => {
    if (!authenticated) {
      return <Navigate to={"/login"} replace />;
    }
    return (
      <>
        <NavBar />
        {children}
      </>
    );
  };

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
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: PATH.Observations,
      element: (
        <ProtectedRoute>
          <Observations />
        </ProtectedRoute>
      ),
    },
    {
      path: PATH.Allergies,
      element: (
        <ProtectedRoute>
          <Allergies />
        </ProtectedRoute>
      ),
    },
    {
      path: PATH.Conditions,
      element: (
        <ProtectedRoute>
          <Conditions />
        </ProtectedRoute>
      ),
    },
    {
      path: PATH.Medications,
      element: (
        <ProtectedRoute>
          <Medications />
        </ProtectedRoute>
      ),
    },
    {
      path: PATH.Whitelist,
      element: (
        <ProtectedRoute>
          <Whitelist />
        </ProtectedRoute>
      ),
    },
    {
      path: PATH.AddObservation,
      element: (
        <ProtectedRoute>
          <AddObservation />
        </ProtectedRoute>
      ),
    },
    {
      path: PATH.AddCondition,
      element: (
        <ProtectedRoute>
          <AddCondition />
        </ProtectedRoute>
      ),
    },
    {
      path: PATH.Profile,
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <UserProvider>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <RouterProvider router={router} />
          </ChakraProvider>
        </QueryClientProvider>
      </CookiesProvider>
    </UserProvider>
  );
}

export default App;
