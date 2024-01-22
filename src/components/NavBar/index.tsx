import {
  Box,
  Popover,
  PopoverTrigger,
  Stack,
  Link,
  Spinner,
  Image,
  Icon,
  chakra,
} from "@chakra-ui/react";
import {
  ADMIN_NAV,
  DOCTOR_NAV,
  NavItems,
  PATH,
  PATIENT_NAV,
} from "../../constants/path";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../model/user/userContext";
import { UserType } from "../../constants/user";
import MyMedtraceLogo from "../../assets/MymedtraceLogo.png";

const NavBar = () => {
  const { user, logoutUser } = useUserContext();

  const isLoggedIn = user?.address && user?.email;

  const navigate = useNavigate();

  const renderNavItems = (navList: NavItems[]) => {
    return (
      <Stack direction={"column"} spacing={2} width={"85%"}>
        {navList.map((navItem) => {
          return (
            <Box
              key={navItem.label}
              borderLeft={
                window.location.pathname === navItem.href
                  ? "solid 3px white"
                  : "unset"
              }
              backgroundColor={
                window.location.pathname === navItem.href
                  ? "whiteAlpha.100"
                  : "unset"
              }
              borderRadius={"0 10px 10px 0"}
              padding={"12px"}
            >
              <Popover trigger={"hover"} placement="bottom-start">
                <PopoverTrigger>
                  <Link
                    href={navItem.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(navItem.href);
                    }}
                    className="hover:text-yellow-200"
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Icon
                      width={"30px"}
                      height={"30px"}
                      as={navItem.icon}
                      paddingRight={"12px"}
                    />
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
      margin={"20px"}
      padding={"48px 12px"}
      display={"flex"}
      borderRadius={"10px"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      color={"white"}
      alignItems={"center"}
      spacing={12}
      width={"250px"}
      height={"calc(100vh - 40px)"}
      position={"sticky"}
      top={0}
      left={0}
      flexShrink={0}
      className="bg-primaryBlue-300"
    >
      {user?.userType ? (
        <>
          <Image src={MyMedtraceLogo} />
          {user?.userType === UserType.PATIENT && renderNavItems(PATIENT_NAV)}
          {user?.userType === UserType.DOCTOR && renderNavItems(DOCTOR_NAV)}
          {user?.userType === UserType.ADMIN && renderNavItems(ADMIN_NAV)}
          <Stack direction={"column"} spacing={2} width={"85%"}>
            {user?.userType !== undefined && (
              <Box
                key="profile"
                borderRadius={"10px"}
                borderLeft={
                  window.location.pathname === PATH.Profile
                    ? "solid 3px white"
                    : "unset"
                }
                padding={"12px"}
                backgroundColor={
                  window.location.pathname === PATH.Profile
                    ? "whiteAlpha.100"
                    : "unset"
                }
              >
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(PATH.Profile);
                  }}
                  className="hover:text-yellow-200"
                >
                  Profile
                </Link>
              </Box>
            )}
            {isLoggedIn && (
              <Box key="logout" borderRadius={"10px"} padding={"12px"}>
                <Link
                  onClick={() => {
                    logoutUser();
                  }}
                  className="hover:text-yellow-200"
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
