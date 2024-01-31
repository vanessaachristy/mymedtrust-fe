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
import AddAllergy from "./containers/add-allergy";
import AddMedication from "./containers/add-medication";
import { customizedTheme } from "./theme";
import Patients from "./containers/patients";
import AllRecords from "./containers/all-records";
import Doctors from "./containers/doctors";
import Intro from "./containers/intro";

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
    const { user, setUser } = useUserContext();
    useEffect(() => {
      if (authenticated) {
        console.log("Authhh");
        setUser({
          ...user,
          isLoggedIn: true,
        });
      }
    }, [authenticated]);

    if (!authenticated) {
      return <Navigate to={PATH.Login} replace />;
    }
    return (
      <div className="flex bg-primaryBlue-500 h-screen">
        <NavBar />
        <div className="overflow-y-scroll w-full">{children}</div>
      </div>
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
      path: PATH.Intro,
      element: <Intro />,
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
      path: PATH.AddAllergy,
      element: (
        <ProtectedRoute>
          <AddAllergy />
        </ProtectedRoute>
      ),
    },
    {
      path: PATH.AddMedication,
      element: (
        <ProtectedRoute>
          <AddMedication />
        </ProtectedRoute>
      ),
    },
    {
      path: PATH.Patient,
      element: (
        <ProtectedRoute>
          <Patients />
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
    {
      path: PATH.AllRecords,
      element: (
        <ProtectedRoute>
          <AllRecords />
        </ProtectedRoute>
      ),
    },
    {
      path: PATH.Doctors,
      element: (
        <ProtectedRoute>
          <Doctors />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <UserProvider>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={customizedTheme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </QueryClientProvider>
      </CookiesProvider>
    </UserProvider>
  );
}

export default App;
