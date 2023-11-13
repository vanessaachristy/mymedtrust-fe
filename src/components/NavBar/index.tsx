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
                <Link to={navItem.href}> {navItem.label}</Link>
              </PopoverTrigger>
            </Popover>
          </Box>
        );
      })}
    </Stack>
  );
};

export default NavBar;
