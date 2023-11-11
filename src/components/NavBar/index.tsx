import { Box, Divider, Popover, PopoverTrigger, Stack } from "@chakra-ui/react";
import { NAV_ITEMS } from "../../constants/path";
import { Link } from "react-router-dom";

const NavBar = () => {
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
                <Box
                  color={
                    window.location.pathname === navItem.href
                      ? "blue.500"
                      : "black"
                  }
                  as="a"
                  p={2}
                  href={navItem.href}
                  fontSize={"xl"}
                  fontWeight={500}
                >
                  {navItem.label}
                </Box>
              </PopoverTrigger>
            </Popover>
          </Box>
        );
      })}
    </Stack>
  );
};

export default NavBar;
