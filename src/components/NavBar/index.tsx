import {
  Box,
  Divider,
  Popover,
  PopoverTrigger,
  Stack,
  Link,
} from "@chakra-ui/react";
import { NAV_ITEMS } from "../../constants/path";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../model/user/userContext";

const NavBar = () => {
  const { user, logoutUser } = useUserContext();

  const isLoggedIn = user?.address && user?.email;

  const navigate = useNavigate();
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      spacing={4}
      padding={"12px"}
      backgroundColor={"gray.100"}
      borderColor={"blue.100"}
      borderBottom={"solid"}
    >
      {NAV_ITEMS.map((navItem) => {
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
  );
};

export default NavBar;
