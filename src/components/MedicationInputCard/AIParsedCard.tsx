import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
  Tag,
  Textarea,
} from "@chakra-ui/react";
import TextArea from "antd/es/input/TextArea";
import axiosWithCredentials, { axiosWithCredentials2 } from "api/fetch";
import { useFetchUserDetailQuery } from "api/user";
import axios from "axios";
import { Medication } from "fhir/r4";
import { useUserContext } from "model/user/userContext";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Form } from "react-router-dom";
import MedicationInputCard, { MedicationData } from ".";

const AIParsedMedicationInputCard = () => {
  const [notesInput, setNotesInput] = useState("");

  const { user, setUser } = useUserContext();
  const { data: userData, refetch: fetchUserData } = useFetchUserDetailQuery();
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);
  useEffect(() => {
    if (!user.name && !user.IC && user.isLoggedIn) {
      fetchUserData();
    }
    if (!user.name && !user.IC) {
      // let recorder = {
      //   reference: `Practitioner/${user.address}`,
      //   display: user.email,
      // };
      // setFormData({
      //   ...formData,
      //   recorder: recorder,
      // });
    }
  }, [user, fetchUserData]);

  const emptyFormData: Medication & {
    account: string;
    patient: string;
    doctor: string;
    additionalNote: string;
  } = {
    account: user.address,
    doctor: user.address,
    patient: "",
    resourceType: "Medication",
    contained: [],
    code: {
      coding: [
        {
          system: "",
          code: "",
          display: "",
        },
      ],
    },
    status: "inactive",
    manufacturer: {
      reference: "",
      display: "",
    },
    form: {
      coding: [
        {
          system: "",
          code: "",
          display: "",
        },
      ],
    },
    ingredient: [
      {
        itemReference: {
          reference: "",
        },
        strength: {
          numerator: {
            value: 0,
            system: "",
            code: "",
          },
          denominator: {
            value: 0,
            system: "",
            code: "",
          },
        },
      },
    ],
    batch: {
      lotNumber: "",
      expirationDate: "",
    },
    additionalNote: "",
  };

  const [formData, setFormData] = useState<
    Medication & {
      account: string;
      patient: string;
      doctor: string;
      additionalNote: string;
    }
  >(emptyFormData);

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

  const handleSelectParsedData = (idx: number) => {
    let medicationName = parsed[idx]?.["DRUG"];
    let medicationForm = parsed[idx]?.["FORM"];
    let medicationValue = parsed[idx]?.["STRENGTH"];
    let medicationDuration = parsed[idx]?.["DURATION"];
    let medicationFrequency = parsed[idx]?.["FREQUENCY"];

    setFormData({
      ...formData,
      code: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "",
            display: medicationName?.toString(),
          },
        ],
      },
      form: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "",
            display: medicationForm?.toString(),
          },
        ],
      },
      ingredient: [
        {
          itemReference: {
            reference: medicationName?.toString(),
          },
          strength: {
            numerator: {
              value: Number(medicationValue.match(/\d+/g)?.toString()) ?? 0,
              code: medicationValue.match(/[A-Za-z]+/g)?.toString() ?? "",
              system: "http://unitsofmeasure.org",
            },
            denominator: {
              value: Number(medicationValue?.match(/\d+/g)?.toString() ?? 0),
              code: medicationValue?.match(/[A-Za-z]+/g)?.toString() ?? "",
              system: "http://unitsofmeasure.org",
            },
          },
        },
      ],
      additionalNote: `Duration: ${medicationDuration}, Frequency: ${medicationFrequency}`,
    });
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

      <Card className="mt-6">
        <CardHeader>
          <Heading size="sm">Parsed Medication</Heading>
        </CardHeader>
        <CardBody padding={6}>
          <RadioGroup onChange={(idx) => handleSelectParsedData(Number(idx))}>
            <Stack>
              {parsed?.length > 0 ? (
                parsed?.map((item, idx) => {
                  return (
                    <Radio
                      style={{
                        textAlign: "left",
                      }}
                      size={"sm"}
                      value={idx.toString()}
                    >
                      {Object.keys(item).map((key) => {
                        return (
                          <span className="pr-2">
                            <Tag>{key.toString()}</Tag> {item[key]?.toString()}
                          </span>
                        );
                      })}
                    </Radio>
                  );
                })
              ) : (
                <div>No data parsed</div>
              )}
            </Stack>
          </RadioGroup>
        </CardBody>
      </Card>
      {parsed?.length > 0 ? <MedicationInputCard data={formData} /> : null}
    </div>
  );
};

export default AIParsedMedicationInputCard;
