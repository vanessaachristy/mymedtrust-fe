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

const NavBar = () => {
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
        console.log(window.location.pathname === navItem.href);

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

export default NavBar;
