import React, { useEffect, useState } from "react";
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Image,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { PATH } from "../../constants/path";
import { useMutation } from "react-query";
import axiosWithCredentials from "../../api/fetch";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../../model/user/userContext";
import LandingImage from "../../assets/landing.png";
import MyMedtraceLogo from "../../assets/MymedtraceLogo.png";

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

  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  const [unauthorizedMessage, setUnauthorizedMessage] = useState("");
  const loginMutation = useMutation({
    mutationFn: (data: any) => {
      return axiosWithCredentials
        .post("/user/login", data)
        .then(function (response) {
          setUnauthorizedMessage("");
          const { email, address } = response.data.data;
          const newUser = {
            isLoggedIn: true,
            email: email,
            address: address,
          };
          setUser(newUser);
        })
        .catch(function (error) {
          if (error?.response?.status === 401) {
            setUnauthorizedMessage(error?.response?.data.message);
          } else {
            setUnauthorizedMessage("Something is wrong!");
          }
          throw new Error();
        });
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    let body = {
      email: formData.email,
      password: formData.password,
    };
    loginMutation.mutate(body);
  };

  useEffect(() => {
    if (loginMutation.isSuccess && !loginMutation.isError) {
      navigate("/");
    }
  }, [loginMutation.isSuccess, loginMutation.isError]);

  return (
    <div className="flex justify-between items-center bg-primaryBlue-500 text-white">
      <div className="w-[50vw] h-screen flex flex-col justify-center items-center text-left px-12">
        <Image src={MyMedtraceLogo} height={"75px"} />
        <div className="h-[80%] flex flex-col justify-center items-center w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <Stack
              spacing={4}
              padding={"12px"}
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
                    placeholder="Email address"
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
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                      bgColor={"primaryBlue.100"}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link color="yellow.100">Forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={12}
                type="submit"
                bgColor={"primaryBlue.100"}
                color="primaryBlue.500"
                width="full"
                isLoading={loginMutation.isLoading}
              >
                Login
              </Button>
              {loginMutation.isError && (
                <Alert status="error" color="black">
                  <AlertIcon />
                  <AlertDescription>{unauthorizedMessage}</AlertDescription>
                </Alert>
              )}
              {loginMutation.isSuccess && !loginMutation.isError && (
                <Alert status="success" color="black">
                  <AlertIcon />
                  <AlertTitle>Sign up successful!</AlertTitle>
                </Alert>
              )}
              <div>
                New to us?{" "}
                <Link color="yellow.100" href={PATH.SignUp}>
                  Sign up
                </Link>
              </div>
            </Stack>
          </form>
        </div>
      </div>
      <div className="h-screen w-[50vw] relative">
        <img
          src={LandingImage}
          alt=""
          className="w-auto h-full block object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-primaryBlue-200 bg-opacity-50"></div>
      </div>
    </div>
  );
};

export default Login;
