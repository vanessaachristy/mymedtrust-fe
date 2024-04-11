import {
  FormControl,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  chakra,
  Heading,
} from "@chakra-ui/react";
import { FaUserAlt, FaUserMd } from "react-icons/fa";
import { useState } from "react";
import { useMutation } from "react-query";
import { Form } from "react-router-dom";
import axiosWithCredentials from "../../api/fetch";
import { useUserContext } from "../../model/user/userContext";

const Whitelist = () => {
  const user = useUserContext();
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaUserMd = chakra(FaUserMd);
  const [formData, setFormData] = useState({
    // account: "0x8Dd02DF718aC13B7502AC421a28265aC6A9631fF",
    account: user?.user?.address,
    patient: "",
    doctor: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [unauthorizedMessage, setUnauthorizedMessage] = useState("");

  const whitelistMutation = useMutation({
    mutationFn: (data: any) => {
      return axiosWithCredentials
        .post("/doctor/whitelist", data)
        .then(function (response) {
          setUnauthorizedMessage("");
          setFormData({
            ...formData,
            patient: "",
            doctor: "",
          });
        })
        .catch(function (error) {
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 400
          ) {
            console.log("error", error?.response);
            setUnauthorizedMessage(error?.response?.data?.error);
          } else {
            setUnauthorizedMessage("Something is wrong!");
          }
          throw new Error();
        });
    },
  });

  const handleSubmit = () => {
    console.log(formData);
    whitelistMutation.mutate(formData);
  };
  return (
    <div className="flex flex-col items-center justify-start p-6 w-full">
      <Heading color="yellow.200" marginBottom={"24px"}>
        Whitelist Doctor
      </Heading>
      <Form
        onSubmit={handleSubmit}
        className="w-screen flex flex-col justify-center items-center px-12"
      >
        <Stack
          spacing={4}
          padding={"24px"}
          width={"80%"}
          justifyContent={"center"}
          alignItems={"center"}
          color="white"
          backgroundColor={"primaryBlue.300"}
          borderRadius={"md"}
        >
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<CFaUserMd color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="Doctor address"
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<CFaUserAlt color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="Patient address"
                name="patient"
                value={formData.patient}
                onChange={handleInputChange}
              />
            </InputGroup>
          </FormControl>
          <Button
            borderRadius={12}
            type="submit"
            backgroundColor={"primaryBlue.50"}
            width="30%"
            isLoading={whitelistMutation.isLoading}
          >
            Whitelist
          </Button>
        </Stack>
        {whitelistMutation.isError && (
          <Alert status="error" width={"80%"}>
            <AlertIcon />
            <AlertDescription>{unauthorizedMessage}</AlertDescription>
          </Alert>
        )}
        {whitelistMutation.isSuccess && !whitelistMutation.isError && (
          <Alert status="success" width="80%">
            <AlertIcon />
            <AlertTitle>Whitelist successful!</AlertTitle>
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default Whitelist;
