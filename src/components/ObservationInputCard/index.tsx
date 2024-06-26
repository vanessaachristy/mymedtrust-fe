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
import { Observation } from "fhir/r4";
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

const ObservationInputCard = () => {
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
      let performer = [
        {
          reference: `Practitioner/${user.address}`,
          display: user.email,
        },
      ];

      setFormData({
        ...formData,
        performer: performer,
      });
    }
  }, [user, fetchUserData]);

  const emptyFormData: Observation & {
    account: string;
    patient: string;
    doctor: string;
    additionalNote: string;
  } = {
    account: user.address,
    doctor: user.address,
    patient: "",
    resourceType: "Observation",
    status: "unknown",
    code: {
      coding: [
        {
          system: "",
          code: "",
          display: "",
        },
      ],
    },
    subject: {
      reference: "",
      display: "",
    },
    effectiveDateTime: getCurrentDateTime(),
    issued: getCurrentDateTime(),
    performer: [
      {
        reference: `Practitioner/${user.address}`,
        display: user.email,
      },
    ],
    valueQuantity: {
      value: 0,
      unit: "",
      system: "http://unitsofmeasure.org",
      code: "",
    },
    interpretation: [],
    referenceRange: [
      {
        low: {
          value: 0,
          unit: "",
          system: "http://unitsofmeasure.org",
          code: "",
        },
        high: {
          value: 0,
          unit: "",
          system: "http://unitsofmeasure.org",
          code: "",
        },
      },
    ],
    additionalNote: "",
  };

  const [formData, setFormData] = useState<
    Observation & {
      account: string;
      patient: string;
      doctor: string;
      additionalNote: string;
    }
  >({
    account: user.address,
    doctor: user.address,
    patient: "",
    resourceType: "Observation",
    status: "unknown",
    code: {
      coding: [
        {
          system: "",
          code: "",
          display: "",
        },
      ],
    },
    subject: {
      reference: "",
      display: "",
    },
    effectiveDateTime: getCurrentDateTime(),
    issued: getCurrentDateTime(),
    performer: [
      {
        reference: `Practitioner/${user.address}`,
        display: user.email,
      },
    ],
    valueQuantity: {
      value: 0,
      unit: "",
      system: "http://unitsofmeasure.org",
      code: "",
    },
    interpretation: [],
    referenceRange: [
      {
        low: {
          value: 0,
          unit: "",
          system: "http://unitsofmeasure.org",
          code: "",
        },
        high: {
          value: 0,
          unit: "",
          system: "http://unitsofmeasure.org",
          code: "",
        },
      },
    ],
    additionalNote: "",
  });

  const {
    data: patientDetails,
    isLoading: isPatientDetailsLoading,
    error: isPatientDetailsError,
    refetch: fetchPatientDetails,
  } = useFetchPatientDetailsQuery(formData?.patient);

  const Patient = (
    <FormControl isRequired>
      <Card>
        <CardHeader>
          <FormLabel size="sm" textTransform={"uppercase"} fontWeight={700}>
            Patient
          </FormLabel>
        </CardHeader>
        <CardBody>
          <InputGroup>
            <Input
              type="text"
              placeholder="Patient Address"
              name="patient"
              value={formData.patient}
              onChange={(e) => {
                const { value } = e.target;
                setFormData({
                  ...formData,
                  patient: value,
                });
              }}
            />
          </InputGroup>
          {isPatientDetailsLoading && (
            <div className="p-6">
              <Spinner />
              Fetching user details...
            </div>
          )}
          {isPatientDetailsError && (
            <Alert status="error">
              {(isPatientDetailsError as any)?.toString()}
            </Alert>
          )}
          {patientDetails?.primaryInfo?.name && (
            <Alert status="success">{patientDetails?.primaryInfo?.name}</Alert>
          )}
        </CardBody>
      </Card>
    </FormControl>
  );

  useEffect(() => {
    // Trigger a refetch when formData?.patient changes and is valid
    if (validateAddress(formData?.patient)) {
      fetchPatientDetails();
    }
  }, [formData?.patient, fetchPatientDetails]);

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
              placeholder="Observation"
              name="resourceType"
              value={formData.resourceType}
              disabled
            />
          </InputGroup>
        </CardBody>
      </Card>
    </FormControl>
  );

  const enum ObservationStatus {
    REGISTERED = "registered",
    PRELIMINARY = "preliminary",
    FINAL = "final",
    AMENDED = "amended",
    CORRECTED = "corrected",
    CANCELLED = "cancelled",
    ENTERED_IN_ERROR = "entered-in-error",
    UNKNOWN = "unknown",
  }

  const Status = (
    <FormControl isRequired>
      <Card>
        <CardHeader>
          <FormLabel size="sm" textTransform={"uppercase"} fontWeight={700}>
            Status
          </FormLabel>
        </CardHeader>
        <CardBody>
          <Select
            placeholder="Status"
            name="status"
            value={formData.status}
            onChange={(e) => {
              const { value } = e.target;
              setFormData({
                ...formData,
                status: value as ObservationStatus,
              });
            }}
          >
            <option value={ObservationStatus.AMENDED}>
              {ObservationStatus.AMENDED}
            </option>
            <option value={ObservationStatus.CANCELLED}>
              {ObservationStatus.CANCELLED}
            </option>
            <option value={ObservationStatus.CORRECTED}>
              {ObservationStatus.CORRECTED}
            </option>
            <option value={ObservationStatus.ENTERED_IN_ERROR}>
              {ObservationStatus.ENTERED_IN_ERROR}
            </option>
            <option value={ObservationStatus.FINAL}>
              {ObservationStatus.FINAL}
            </option>
            <option value={ObservationStatus.PRELIMINARY}>
              {ObservationStatus.PRELIMINARY}
            </option>
            <option value={ObservationStatus.REGISTERED}>
              {ObservationStatus.REGISTERED}
            </option>
            <option value={ObservationStatus.UNKNOWN}>
              {ObservationStatus.UNKNOWN}
            </option>
          </Select>
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
            <InputGroup>
              <Input
                type="text"
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
              />
            </InputGroup>
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

  const Subject = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Subject
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
                // value={formData?.subject?.reference}
                value={
                  patientDetails
                    ? `Patient/${patientDetails?.primaryInfo?.address}`
                    : ""
                }
                disabled
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Display</FormLabel>
            <InputGroup>
              {isPatientDetailsLoading ? (
                <Spinner />
              ) : (
                <Input
                  type="text"
                  placeholder="Display"
                  name="display"
                  value={patientDetails?.primaryInfo?.name}
                  disabled
                />
              )}
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const Performer = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Performer
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
                value={formData?.performer?.[0].reference}
                disabled
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
                value={formData?.performer?.[0].display}
                disabled
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const ValueQuantity = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Value Quantity
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"row"} spacing={4}>
          <FormControl isRequired>
            <FormLabel>Value</FormLabel>
            <InputGroup>
              <NumberInput
                defaultValue={formData?.valueQuantity?.value}
                min={0}
                name="value"
                placeholder="Value"
                width={"100%"}
                onChange={(val) => {
                  const valueQuantity = formData?.valueQuantity;
                  setFormData({
                    ...formData,
                    valueQuantity: {
                      ...valueQuantity,
                      value: Number(val),
                    },
                  });
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Unit</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Unit"
                name="unit"
                value={formData?.valueQuantity?.unit}
                onChange={(e) => {
                  const { value } = e.target;
                  const valueQuantity = formData?.valueQuantity;
                  setFormData({
                    ...formData,
                    referenceRange: [
                      {
                        ...formData?.referenceRange?.[0],
                        low: {
                          ...formData?.referenceRange?.[0].low,
                          unit: value,
                        },
                        high: {
                          ...formData?.referenceRange?.[0].high,
                          unit: value,
                        },
                      },
                    ],
                    valueQuantity: {
                      ...valueQuantity,
                      unit: value,
                    },
                  });
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Code</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Code"
                name="code"
                value={formData?.valueQuantity?.code}
                onChange={(e) => {
                  const { value } = e.target;
                  const valueQuantity = formData?.valueQuantity;
                  setFormData({
                    ...formData,
                    referenceRange: [
                      {
                        ...formData?.referenceRange?.[0],
                        low: {
                          ...formData?.referenceRange?.[0].low,
                          code: value,
                        },
                        high: {
                          ...formData?.referenceRange?.[0].high,
                          code: value,
                        },
                      },
                    ],
                    valueQuantity: {
                      ...valueQuantity,
                      code: value,
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

  const ReferenceRange = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Reference Range
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"column"} spacing={4} divider={<StackDivider />}>
          <Stack direction="column" spacing={2}>
            <Heading size="xs" textTransform={"uppercase"}>
              Low
            </Heading>
            <Stack direction={"row"} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Value</FormLabel>
                <InputGroup>
                  <NumberInput
                    defaultValue={formData?.referenceRange?.[0]?.low?.value}
                    min={0}
                    name="value"
                    placeholder="Value"
                    width={"100%"}
                    onChange={(val) => {
                      const low = formData?.referenceRange?.[0]?.low;
                      setFormData({
                        ...formData,
                        referenceRange: [
                          {
                            ...formData?.referenceRange?.[0],
                            low: {
                              ...low,
                              value: Number(val),
                            },
                          },
                        ],
                      });
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Unit</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Unit"
                    name="unit"
                    value={formData?.valueQuantity?.unit}
                    disabled
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Display</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Code"
                    name="code"
                    value={formData?.valueQuantity?.code}
                    disabled
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </Stack>
          <Stack direction="column">
            <Heading size="xs" textTransform={"uppercase"}>
              High
            </Heading>
            <Stack direction={"row"} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Value</FormLabel>
                <InputGroup>
                  <NumberInput
                    defaultValue={formData?.referenceRange?.[0]?.high?.value}
                    min={0}
                    name="value"
                    placeholder="Value"
                    width={"100%"}
                    onChange={(val) => {
                      const high = formData?.referenceRange?.[0]?.high;
                      setFormData({
                        ...formData,
                        referenceRange: [
                          {
                            ...formData?.referenceRange?.[0],
                            high: {
                              ...high,
                              value: Number(val),
                            },
                          },
                        ],
                      });
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Unit</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Unit"
                    name="unit"
                    value={formData?.valueQuantity?.unit}
                    disabled
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Display</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Code"
                    name="code"
                    value={formData?.valueQuantity?.code}
                    disabled
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );

  const AdditionalNote = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Additional Note
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"row"} spacing={4}>
          <FormControl>
            <InputGroup>
              <Input
                type="text"
                placeholder="Additional doctor note"
                name="additionalNote"
                value={formData?.additionalNote}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData({
                    ...formData,
                    additionalNote: value,
                  });
                }}
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const [addResponse, setAddResponse] = useState<any>(null);

  const addObservationMutation = useMutation({
    mutationFn: (data: any) => {
      return axiosWithCredentials
        .post("/record/observation/create", data)
        .then(function (response) {
          console.log(response);
          setAddResponse(response.data?.data);
        })
        .catch(function (error) {
          throw new Error();
        });
    },
  });

  const handleSubmitForm = () => {
    console.log(JSON.stringify(formData));
    addObservationMutation.mutate(formData);
  };

  const CBsPatchCheckFill = chakra(BsPatchCheckFill);

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setFormData(emptyFormData);
    setModalOpen(false);
  };

  useEffect(() => {
    if (addObservationMutation.isSuccess && !addObservationMutation.isError) {
      setModalOpen(true);
    }
  }, [addObservationMutation.isSuccess, addObservationMutation.isError]);

  const navigate = useNavigate();

  const handleToHome = () => {
    navigate("/");
  };

  return (
    <div className="w-[70%]">
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
          {Patient}
          {ResourceType}
          {Status}
          {Code}
          {Subject}
          {Performer}
          {ValueQuantity}
          {ReferenceRange}
          {AdditionalNote}
        </Stack>
        <Button
          type="submit"
          isLoading={addObservationMutation.isLoading}
          bgColor={"blue.500"}
          color={"white"}
        >
          Submit
        </Button>
      </Form>
      {addObservationMutation.isError && (
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
            <Button variant="solid" onClick={handleToHome}>
              Go to Home
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ObservationInputCard;
