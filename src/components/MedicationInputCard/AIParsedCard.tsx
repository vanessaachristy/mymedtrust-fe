import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Tag,
  Textarea,
} from "@chakra-ui/react";
import TextArea from "antd/es/input/TextArea";
import axiosWithCredentials, { axiosWithCredentials2 } from "api/fetch";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { Form } from "react-router-dom";

const AIParsedMedicationInputCard = () => {
  const [notesInput, setNotesInput] = useState("");

  const NotesInput = (
    <FormControl isRequired>
      <Card>
        <CardBody>
          <InputGroup>
            <Textarea
              placeholder="Insert free-text medication notes"
              value={notesInput}
              onChange={(e) => {
                const value = e.target.value;
                setNotesInput(value);
              }}
            />
          </InputGroup>
        </CardBody>
      </Card>
    </FormControl>
  );

  const [parsed, setParsed] = useState<Array<Record<string, string>>>([]);

  const parseMedication = useMutation({
    mutationFn: (data: any) => {
      return axiosWithCredentials2
        .post("/parseMedication", data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(function (response) {
          setParsed(response.data);
        })
        .catch(function (error) {
          console.error(error);
          throw new Error();
        });
    },
  });

  const handleParse = () => {
    console.log(notesInput);
    let json = {
      text: notesInput,
    };
    parseMedication.mutate(JSON.stringify(json));
  };

  return (
    <div className="w-full">
      <Form
        className="w-full flex flex-col justify-center"
        onSubmit={handleParse}
      >
        <Stack
          spacing={4}
          padding={"12px"}
          backgroundColor={"whiteAlpha.100"}
          width={"100%"}
          textAlign={"left"}
        >
          {NotesInput}
        </Stack>
        <Button
          type="submit"
          bgColor={"blue.500"}
          color={"white"}
          isLoading={parseMedication.isLoading}
        >
          Parse Notes
        </Button>
      </Form>

      <Card>
        <CardBody padding={10}>
          <ol type="1">
            {parsed?.map((item) => {
              return (
                <li
                  style={{
                    textAlign: "left",
                  }}
                >
                  {Object.keys(item).map((key) => {
                    return (
                      <span className="pr-2">
                        <Tag>{item[key]?.toString()}</Tag> {key.toString()}
                      </span>
                    );
                  })}
                </li>
              );
            })}
          </ol>
        </CardBody>
      </Card>
    </div>
  );
};

export default AIParsedMedicationInputCard;
