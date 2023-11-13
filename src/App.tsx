import React, { useEffect, useState } from "react";
import "./App.scss";
import Home from "./containers/home";
import {
  createBrowserRouter,
  Navigate,
  Route,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
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
import { Provider as ReduxProvider } from "react-redux";
import store from "./model/store";
import { checkAuthorizationCookie } from "./api/fetch";
import { UserProvider } from "./model/user/userContext";

function App() {
  const queryClient = new QueryClient();

  const isAuthenticated = checkAuthorizationCookie();

  console.log("isAuth", isAuthenticated);

  const ProtectedRoute = ({ children }: any) => {
    if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
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
  ]);

  return (
    <UserProvider>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <RouterProvider router={router} />
          </ChakraProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </UserProvider>
  );
}

export default App;
