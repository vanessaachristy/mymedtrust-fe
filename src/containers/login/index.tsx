import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  chakra,
  Link,
  Stack,
  Box,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { PATH } from "../../constants/user/path";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // You can handle form submission logic here, such as sending the data to a server or performing client-side validation.
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="w-[50vw] h-screen flex flex-col justify-center items-center text-left px-12">
        <div className="w-full text-cyan-800 font-semibold text-2xl">
          MyMedtrace
        </div>
        <div className="h-[80%] flex flex-col justify-center items-center w-full">
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              padding={"12px"}
              backgroundColor={"whiteAlpha.100"}
              width={"100%"}
              textAlign={"left"}
            >
              <h3>Welcome back!</h3>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>Forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={12}
                type="submit"
                colorScheme="blue"
                width="full"
              >
                Login
              </Button>
              <div>
                New to us?{" "}
                <Link color="blue.400" href={PATH.SignUp}>
                  Sign up
                </Link>
              </div>
            </Stack>
          </form>
        </div>
      </div>
      <div className="h-screen w-[50vw] bg-cyan-800"></div>
    </div>
  );
};

export default Login;
