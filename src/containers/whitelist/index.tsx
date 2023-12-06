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
    account: "0x8Dd02DF718aC13B7502AC421a28265aC6A9631fF",
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
        })
        .catch(function (error) {
          if (error?.response?.status === 401) {
            console.log("error", error?.response);
            setUnauthorizedMessage(error?.response?.data?.message);
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
    <Form
      onSubmit={handleSubmit}
      className="w-screen flex flex-col justify-center items-center px-12"
    >
      <Stack
        spacing={4}
        padding={"12px"}
        backgroundColor={"whiteAlpha.100"}
        width={"80%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading color="blue.500">Whitelist Doctor</Heading>
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
          colorScheme="blue"
          width="30%"
          isLoading={whitelistMutation.isLoading}
        >
          Whitelist
        </Button>
      </Stack>
      {whitelistMutation.isError && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{unauthorizedMessage}</AlertDescription>
        </Alert>
      )}
      {whitelistMutation.isSuccess && !whitelistMutation.isError && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Whitelist successful!</AlertTitle>
        </Alert>
      )}
    </Form>
  );
};

export default Whitelist;
