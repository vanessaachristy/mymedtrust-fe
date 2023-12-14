import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Stack,
  StackDivider,
  Text,
  chakra,
} from "@chakra-ui/react";
import { AllergyIntolerance, Medication } from "fhir/r4";
import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useUserContext } from "../../model/user/userContext";
import { getCurrentDateTime, validateAddress } from "../../utils";
import { useMutation } from "react-query";
import axiosWithCredentials from "../../api/fetch";
import {
  useFetchPatientDetailsQuery,
  useFetchUserDetailQuery,
} from "../../api/user";
import { BsPatchCheckFill } from "react-icons/bs";
import moment from "moment";

const MedicationInputCard = () => {
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
  };

  const [formData, setFormData] = useState<
    Medication & {
      account: string;
      patient: string;
      doctor: string;
    }
  >(emptyFormData);

  const {
    data: patientDetails,
    isLoading: isPatientDetailsLoading,
    isError: isPatientDetailsError,
    error: patientDetailsError,
    refetch: fetchPatientDetails,
  } = useFetchPatientDetailsQuery(formData?.patient);

  useEffect(() => {
    // Trigger a refetch when formData?.patient changes and is valid
    if (formData?.patient.length > 0) {
      if (validateAddress(formData?.patient)) {
        fetchPatientDetails();
      } else {
        setPatientNote("Patient's address format invalid!");
      }
    } else {
      setPatientNote("");
    }
  }, [formData?.patient, fetchPatientDetails]);

  const [patientNote, setPatientNote] = useState<string>("");

  useEffect(() => {
    if (isPatientDetailsError) {
      setPatientNote((patientDetailsError as any)?.message);
    }
  }, [isPatientDetailsError, patientDetailsError]);

  useEffect(() => {
    if (patientDetails?.primaryInfo) {
      setPatientNote(patientDetails?.primaryInfo?.name);
    } else {
      setPatientNote("");
    }
  }, [patientDetails]);

  const PatientAddress = (
    <FormControl isRequired>
      <Card>
        <CardHeader>
          <FormLabel size="sm" textTransform={"uppercase"} fontWeight={700}>
            Patient Address
          </FormLabel>
        </CardHeader>
        <CardBody>
          <InputGroup>
            <Input
              type="text"
              placeholder="Patient Address"
              name="patient"
              value={formData?.patient}
              onChange={(e) => {
                const { value } = e.target;
                setFormData({
                  ...formData,
                  patient: value,
                });
              }}
            />
          </InputGroup>
          {patientNote?.length > 0 && (
            <Alert marginTop={4}>{patientNote}</Alert>
          )}
        </CardBody>
      </Card>
    </FormControl>
  );

  const ResourceType = (
    <FormControl>
      <Card>
        <CardHeader>
          <FormLabel size="sm" textTransform={"uppercase"} fontWeight={700}>
            Resource Type
          </FormLabel>
        </CardHeader>
        <CardBody>
          <InputGroup>
            <Input
              type="text"
              placeholder="Medication"
              name="resourceType"
              value={formData.resourceType}
              disabled
            />
          </InputGroup>
        </CardBody>
      </Card>
    </FormControl>
  );

  const Code = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Code
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"row"} spacing={4}>
          <FormControl isRequired>
            <FormLabel>System</FormLabel>
            <Select
              placeholder="System"
              name="system"
              value={formData?.code?.coding?.[0].system}
              onChange={(e) => {
                const { value } = e.target;
                const coding = formData?.code?.coding?.[0];
                setFormData({
                  ...formData,
                  code: {
                    coding: [
                      {
                        ...coding,
                        system: value,
                      },
                    ],
                  },
                });
              }}
            >
              <option value="http://snomed.info/sct">
                http://snomed.info/sct
              </option>
              <option value="http://www.nlm.nih.gov/research/umls/rxnorm">
                http://www.nlm.nih.gov/research/umls/rxnorm
              </option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Code</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Code"
                name="code"
                value={formData?.code?.coding?.[0].code}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.code?.coding?.[0];
                  setFormData({
                    ...formData,
                    code: {
                      coding: [
                        {
                          ...coding,
                          code: value,
                        },
                      ],
                    },
                  });
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Display</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Display"
                name="display"
                value={formData?.code?.coding?.[0].display}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.code?.coding?.[0];
                  setFormData({
                    ...formData,
                    code: {
                      coding: [
                        {
                          ...coding,
                          display: value,
                        },
                      ],
                    },
                  });
                }}
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const enum StatusLevel {
    ACTIVE = "active",
    INACTIVE = "inactive",
    ENTERED_IN_ERROR = "entered-in-error",
  }
  const Status = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Status
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"row"} spacing={4}>
          <FormControl isRequired>
            <Select
              placeholder="Status"
              name="status"
              value={formData?.status}
              onChange={(e) => {
                const { value } = e.target;
                setFormData({
                  ...formData,
                  status: value as StatusLevel,
                });
              }}
            >
              <option value={StatusLevel.ACTIVE}>{StatusLevel.ACTIVE}</option>
              <option value={StatusLevel.INACTIVE}>
                {StatusLevel.INACTIVE}
              </option>
              <option value={StatusLevel.ENTERED_IN_ERROR}>
                {StatusLevel.ENTERED_IN_ERROR}
              </option>
            </Select>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const Manufacturer = (
    <FormControl>
      <Card>
        <CardHeader>
          <Heading size="sm" textTransform={"uppercase"}>
            Manufacturer
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack direction={"row"} spacing={4}>
            <FormControl>
              <FormLabel>Reference</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Reference"
                  name="reference"
                  value={formData?.manufacturer?.reference}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData({
                      ...formData,
                      manufacturer: {
                        ...formData?.manufacturer,
                        reference: value,
                      },
                    });
                  }}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Display</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Display"
                  name="display"
                  value={formData?.manufacturer?.display}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData({
                      ...formData,
                      manufacturer: {
                        ...formData?.manufacturer,
                        display: value,
                      },
                    });
                  }}
                />
              </InputGroup>
            </FormControl>
          </Stack>
        </CardBody>
      </Card>
    </FormControl>
  );

  const Ingredient = (
    <FormControl>
      <Card>
        <CardHeader>
          <Heading size="sm" textTransform={"uppercase"}>
            Ingredient
          </Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <FormLabel>Item Reference</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Reference"
                name="reference"
                value={formData?.ingredient?.[0]?.itemReference?.reference}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData({
                    ...formData,
                    ingredient: [
                      {
                        ...formData?.ingredient?.[0],
                        itemReference: {
                          reference: value,
                        },
                      },
                    ],
                  });
                }}
              />
            </InputGroup>
          </FormControl>
          <Divider color="gray.300" />
          <Stack>
            <Heading size="sm">Numerator</Heading>
            <Stack direction={"row"} spacing={4}>
              <FormControl>
                <FormLabel>Value</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Value"
                    name="value"
                    value={
                      formData?.ingredient?.[0]?.strength?.numerator?.value
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormData({
                        ...formData,
                        ingredient: [
                          {
                            ...formData?.ingredient?.[0],
                            strength: {
                              ...formData?.ingredient?.[0]?.strength,
                              numerator: {
                                ...formData?.ingredient?.[0]?.strength
                                  ?.numerator,
                                value: Number(value),
                              },
                            },
                          },
                        ],
                      });
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>System</FormLabel>
                <InputGroup>
                  <Select
                    placeholder="System"
                    name="system"
                    value={
                      formData?.ingredient?.[0]?.strength?.numerator?.system
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormData({
                        ...formData,
                        ingredient: [
                          {
                            ...formData?.ingredient?.[0],
                            strength: {
                              ...formData?.ingredient?.[0]?.strength,
                              numerator: {
                                ...formData?.ingredient?.[0]?.strength
                                  ?.numerator,
                                system: value,
                              },
                            },
                          },
                        ],
                      });
                    }}
                  >
                    <option value="http://unitsofmeasure.org">
                      http://unitsofmeasure.org
                    </option>
                  </Select>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Code</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Code"
                    name="code"
                    value={formData?.ingredient?.[0]?.strength?.numerator?.code}
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormData({
                        ...formData,
                        ingredient: [
                          {
                            ...formData?.ingredient?.[0],
                            strength: {
                              ...formData?.ingredient?.[0]?.strength,
                              numerator: {
                                ...formData?.ingredient?.[0]?.strength
                                  ?.numerator,
                                code: value,
                              },
                            },
                          },
                        ],
                      });
                    }}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </Stack>
          <Divider color="gray.300" />

          <Stack>
            <Heading size="sm">Denominator</Heading>
            <Stack direction={"row"} spacing={4}>
              <FormControl>
                <FormLabel>Value</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Value"
                    name="value"
                    value={
                      formData?.ingredient?.[0]?.strength?.denominator?.value
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormData({
                        ...formData,
                        ingredient: [
                          {
                            ...formData?.ingredient?.[0],
                            strength: {
                              ...formData?.ingredient?.[0]?.strength,
                              denominator: {
                                ...formData?.ingredient?.[0]?.strength
                                  ?.denominator,
                                value: Number(value),
                              },
                            },
                          },
                        ],
                      });
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>System</FormLabel>
                <InputGroup>
                  <Select
                    placeholder="System"
                    name="system"
                    value={
                      formData?.ingredient?.[0]?.strength?.denominator?.system
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormData({
                        ...formData,
                        ingredient: [
                          {
                            ...formData?.ingredient?.[0],
                            strength: {
                              ...formData?.ingredient?.[0]?.strength,
                              denominator: {
                                ...formData?.ingredient?.[0]?.strength
                                  ?.denominator,
                                system: value,
                              },
                            },
                          },
                        ],
                      });
                    }}
                  >
                    <option value="http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm">
                      http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm
                    </option>
                  </Select>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Code</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Code"
                    name="code"
                    value={
                      formData?.ingredient?.[0]?.strength?.denominator?.code
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormData({
                        ...formData,
                        ingredient: [
                          {
                            ...formData?.ingredient?.[0],
                            strength: {
                              ...formData?.ingredient?.[0]?.strength,
                              denominator: {
                                ...formData?.ingredient?.[0]?.strength
                                  ?.denominator,
                                code: value,
                              },
                            },
                          },
                        ],
                      });
                    }}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </FormControl>
  );

  const MedForm = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Form
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"row"} spacing={4}>
          <FormControl isRequired>
            <FormLabel>System</FormLabel>
            <Select
              placeholder="System"
              name="system"
              value={formData?.form?.coding?.[0].system}
              onChange={(e) => {
                const { value } = e.target;
                const coding = formData?.form?.coding?.[0];
                setFormData({
                  ...formData,
                  form: {
                    coding: [
                      {
                        ...coding,
                        system: value,
                      },
                    ],
                  },
                });
              }}
            >
              <option value="http://snomed.info/sct">
                http://snomed.info/sct
              </option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Code</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Code"
                name="code"
                value={formData?.form?.coding?.[0].code}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.form?.coding?.[0];
                  setFormData({
                    ...formData,
                    form: {
                      coding: [
                        {
                          ...coding,
                          code: value,
                        },
                      ],
                    },
                  });
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Display</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Display"
                name="display"
                value={formData?.form?.coding?.[0].display}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.form?.coding?.[0];
                  setFormData({
                    ...formData,
                    form: {
                      coding: [
                        {
                          ...coding,
                          display: value,
                        },
                      ],
                    },
                  });
                }}
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const Batch = (
    <FormControl>
      <Card>
        <CardHeader>
          <Heading size="sm" textTransform={"uppercase"}>
            Batch
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack direction={"row"} spacing={4}>
            <FormControl>
              <FormLabel>Lot Number</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Lot Number"
                  name="lotNumber"
                  value={formData?.batch?.lotNumber}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData({
                      ...formData,
                      batch: {
                        ...formData?.batch,
                        lotNumber: value,
                      },
                    });
                  }}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Expiration Date</FormLabel>
              <InputGroup>
                <Input
                  type="date"
                  placeholder="Expiration Date"
                  name="expirationDate"
                  value={formData?.batch?.expirationDate}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData({
                      ...formData,
                      batch: {
                        ...formData?.batch,
                        expirationDate: value,
                      },
                    });
                  }}
                />
              </InputGroup>
            </FormControl>
          </Stack>
        </CardBody>
      </Card>
    </FormControl>
  );

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [addResponse, setAddResponse] = useState<any>(null);

  const addMedicationMutation = useMutation({
    mutationFn: (data: any) => {
      return axiosWithCredentials
        .post("/record/medication/create", data)
        .then(function (response) {
          setAddResponse(response.data?.data);
        })
        .catch(function (error) {
          throw new Error();
        });
    },
  });

  const handleSubmitForm = () => {
    console.log(JSON.stringify(formData));
    addMedicationMutation.mutate(formData);
  };

  const CBsPatchCheckFill = chakra(BsPatchCheckFill);

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setFormData(emptyFormData);
    setModalOpen(false);
  };

  useEffect(() => {
    if (addMedicationMutation.isSuccess && !addMedicationMutation.isError) {
      setModalOpen(true);
    }
  }, [addMedicationMutation.isSuccess, addMedicationMutation.isError]);

  const navigate = useNavigate();

  const handleToAllergiesList = () => {
    navigate("/medications");
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmitForm}
        className="w-full flex flex-col justify-center"
      >
        <Stack
          spacing={4}
          padding={"12px"}
          backgroundColor={"whiteAlpha.100"}
          width={"100%"}
          textAlign={"left"}
        >
          {PatientAddress}
          {ResourceType}
          {Status}
          {Code}
          {MedForm}
          {Manufacturer}
          {Ingredient}
          {Batch}
        </Stack>
        <Button
          type="submit"
          isLoading={addMedicationMutation.isLoading}
          bgColor={"blue.500"}
          color={"white"}
        >
          Submit
        </Button>
      </Form>
      {addMedicationMutation.isError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{"Something went wrong!"}</AlertTitle>
        </Alert>
      )}

      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            Observations successfully added!
          </ModalHeader>
          <ModalBody className="flex flex-col justify-center items-center">
            <CBsPatchCheckFill color={"green.300"} size={150} />
            <Text size={"sm"} paddingTop={"6"}>
              ID: {addResponse?.["dataID"]}
            </Text>
            <Text size={"sm"}>{addResponse?.["timestamp"]}</Text>
          </ModalBody>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="solid" onClick={handleToAllergiesList}>
              Go to Allergies
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MedicationInputCard;
