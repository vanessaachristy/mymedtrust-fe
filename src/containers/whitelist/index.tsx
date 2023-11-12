import {
  FormControl,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-router-dom";

const Whitelist = () => {
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

  const handleSubmit = () => {
    console.log(formData);
  };
  return (
    <Form onSubmit={handleSubmit} className="w-full">
      <Stack
        spacing={4}
        padding={"12px"}
        backgroundColor={"whiteAlpha.100"}
        width={"80%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <h3>Whitelist patient</h3>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none" />
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
            <InputLeftElement pointerEvents="none" />
            <Input
              type="text"
              placeholder="Patient address"
              name="patient"
              value={formData.patient}
              onChange={handleInputChange}
            />
          </InputGroup>
        </FormControl>
        <Button borderRadius={12} type="submit" colorScheme="blue" width="30%">
          Whitelist
        </Button>
      </Stack>
    </Form>
  );
};

export default Whitelist;
