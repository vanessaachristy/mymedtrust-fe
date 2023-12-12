import {
  Box,
  Divider,
  Popover,
  PopoverTrigger,
  Stack,
  Link,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import {
  ADMIN_NAV,
  DOCTOR_NAV,
  NavItems,
  PATIENT_NAV,
  PROFILE_NAV,
} from "../../constants/path";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../model/user/userContext";
import { UserType } from "../../constants/user";

const NavBar = () => {
  const { user, logoutUser } = useUserContext();

  const isLoggedIn = user?.address && user?.email;

  const navigate = useNavigate();

  const renderNavItems = (navList: NavItems[]) => {
    return (
      <Stack direction={"column"} spacing={6} width={"60%"}>
        {navList.map((navItem) => {
          return (
            <Box key={navItem.label}>
              <Popover trigger={"hover"} placement="bottom-start">
                <PopoverTrigger>
                  <Link
                    href={navItem.href}
                    color={
                      window.location.pathname === navItem.href
                        ? "blue.500"
                        : "black"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(navItem.href);
                    }}
                  >
                    {navItem.label}
                  </Link>
                </PopoverTrigger>
              </Popover>
            </Box>
          );
        })}
      </Stack>
    );
  };
  return (
    <Stack
      padding={"48px 12px"}
      backgroundColor={"gray.100"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={12}
      width={"250px"}
      height={"100vh"}
      position={"sticky"}
      top={0}
      left={0}
      flexShrink={0}
    >
      {user?.userType ? (
        <>
          <Heading size="md">MyMedtrace</Heading>
          {user?.userType === UserType.PATIENT && renderNavItems(PATIENT_NAV)}
          {user?.userType === UserType.DOCTOR && renderNavItems(DOCTOR_NAV)}
          {user?.userType === UserType.ADMIN && renderNavItems(ADMIN_NAV)}
          <Stack direction={"column"} spacing={6} width={"60%"}>
            {user?.userType !== undefined && renderNavItems(PROFILE_NAV)}
            {isLoggedIn && (
              <Box key="logout">
                <Link
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  Log Out
                </Link>
              </Box>
            )}
          </Stack>
        </>
      ) : (
        <Spinner />
      )}
    </Stack>
  );
};

export default NavBar;
