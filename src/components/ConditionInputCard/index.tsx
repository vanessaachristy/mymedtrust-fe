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
} from "@chakra-ui/react";
import { Condition } from "fhir/r4";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { useUserContext } from "../../model/user/userContext";
import { getCurrentDateTime, validateAddress } from "../../utils";
import { useMutation } from "react-query";
import axiosWithCredentials from "../../api/fetch";
import { useFetchPatientDetailsQuery } from "../../api/user";
import moment from "moment";

const ConditionInputCard = () => {
  const { user } = useUserContext();
  const [formData, setFormData] = useState<
    Condition & { account: string; patient: string; doctor: string }
  >({
    account: user.address,
    doctor: user.address,
    patient: "",
    resourceType: "Condition",
    clinicalStatus: {
      coding: [
        {
          system: "",
          code: "",
        },
      ],
    },
    verificationStatus: {
      coding: [
        {
          system: "",
          code: "",
        },
      ],
    },
    category: [
      {
        coding: [
          {
            system: "",
            code: "",
            display: "",
          },
        ],
      },
    ],
    severity: {
      coding: [
        {
          system: "",
          code: "",
          display: "",
        },
      ],
    },
    code: {
      coding: [
        {
          system: "",
          code: "",
          display: "",
        },
      ],
    },
    bodySite: [
      {
        coding: [
          {
            system: "",
            code: "",
            display: "",
          },
        ],
      },
    ],
    subject: {
      reference: "",
      display: "",
    },
    encounter: {
      reference: "",
      display: "",
    },
    onsetDateTime: "",
    abatementDateTime: "",
    recordedDate: moment().format("YYYY-MM-DD HH:mm"),
    recorder: {
      reference: `Practitioner/${user.address}`,
      display: user.email,
    },
    asserter: {
      reference: `Practitioner/${user.address}`,
      display: user.email,
    },
    evidence: [
      {
        code: [
          {
            coding: [
              {
                system: "",
                code: "",
                display: "",
              },
            ],
          },
        ],
        detail: [
          {
            reference: "",
            display: "",
          },
        ],
      },
    ],
  });

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
        </CardBody>
      </Card>
    </FormControl>
  );

  const {
    data: patientDetails,
    isLoading: isPatientDetailsLoading,
    error: isPatientDetailsError,
    refetch: fetchPatientDetails,
  } = useFetchPatientDetailsQuery(formData?.patient);

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
                  patientDetails && formData?.patient
                    ? `Patient/${patientDetails?.primaryInfo?.address}`
                    : "Patient"
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
                  placeholder="Display Name"
                  name="display"
                  value={
                    patientDetails && formData?.patient
                      ? patientDetails?.primaryInfo?.name
                      : ""
                  }
                  disabled
                />
              )}
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const ClinicalStatus = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Clinical Status
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
                value={formData?.clinicalStatus?.coding?.[0].system}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.clinicalStatus?.coding?.[0];
                  setFormData({
                    ...formData,
                    clinicalStatus: {
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
                value={formData?.clinicalStatus?.coding?.[0].code}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.clinicalStatus?.coding?.[0];
                  setFormData({
                    ...formData,
                    clinicalStatus: {
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
        </Stack>
      </CardBody>
    </Card>
  );

  const VerificationStatus = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Verification Status
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
                value={formData?.verificationStatus?.coding?.[0].system}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.verificationStatus?.coding?.[0];
                  setFormData({
                    ...formData,
                    verificationStatus: {
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
                value={formData?.verificationStatus?.coding?.[0].code}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.verificationStatus?.coding?.[0];
                  setFormData({
                    ...formData,
                    verificationStatus: {
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
        </Stack>
      </CardBody>
    </Card>
  );

  const Category = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Category
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
                value={formData?.category?.[0]?.coding?.[0].system}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.category?.[0]?.coding?.[0];
                  setFormData({
                    ...formData,
                    category: [
                      {
                        coding: [
                          {
                            ...coding,
                            system: value,
                          },
                        ],
                      },
                    ],
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
                value={formData?.category?.[0]?.coding?.[0].code}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.category?.[0]?.coding?.[0];
                  setFormData({
                    ...formData,
                    category: [
                      {
                        coding: [
                          {
                            ...coding,
                            code: value,
                          },
                        ],
                      },
                    ],
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
                value={formData?.category?.[0]?.coding?.[0].display}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.category?.[0]?.coding?.[0];
                  setFormData({
                    ...formData,
                    category: [
                      {
                        coding: [
                          {
                            ...coding,
                            display: value,
                          },
                        ],
                      },
                    ],
                  });
                }}
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const Severity = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Severity
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
                value={formData?.severity?.coding?.[0].system}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.severity?.coding?.[0];
                  setFormData({
                    ...formData,
                    severity: {
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
                value={formData?.severity?.coding?.[0].code}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.severity?.coding?.[0];
                  setFormData({
                    ...formData,
                    severity: {
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
                value={formData?.severity?.coding?.[0].display}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.severity?.coding?.[0];
                  setFormData({
                    ...formData,
                    severity: {
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

  const BodySite = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Body Site
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
                value={formData?.bodySite?.[0]?.coding?.[0].system}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.bodySite?.[0]?.coding?.[0];
                  setFormData({
                    ...formData,
                    bodySite: [
                      {
                        coding: [
                          {
                            ...coding,
                            system: value,
                          },
                        ],
                      },
                    ],
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
                value={formData?.bodySite?.[0]?.coding?.[0].code}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.bodySite?.[0]?.coding?.[0];
                  setFormData({
                    ...formData,
                    bodySite: [
                      {
                        coding: [
                          {
                            ...coding,
                            code: value,
                          },
                        ],
                      },
                    ],
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
                value={formData?.bodySite?.[0]?.coding?.[0].display}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.bodySite?.[0]?.coding?.[0];
                  setFormData({
                    ...formData,
                    bodySite: [
                      {
                        coding: [
                          {
                            ...coding,
                            display: value,
                          },
                        ],
                      },
                    ],
                  });
                }}
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const Recorder = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Recorder
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
                value={formData?.recorder?.reference}
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
                value={formData?.recorder?.display}
                disabled
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const Asserter = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Asserter
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
                value={formData?.asserter?.reference}
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
                value={formData?.asserter?.display}
                disabled
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const OnsetDateTime = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Onset Date Time
        </Heading>
        <CardBody>
          <FormControl>
            <InputGroup>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                onChange={(e) => {
                  const formatted = moment(e.target.value).format(
                    "YYYY-MM-DD HH:mm"
                  );
                  setFormData({
                    ...formData,
                    onsetDateTime: formatted,
                  });
                }}
              />
            </InputGroup>
          </FormControl>
        </CardBody>
      </CardHeader>
    </Card>
  );

  const AbatementDateTime = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Abatement Date Time
        </Heading>
        <CardBody>
          <FormControl>
            <InputGroup>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                onChange={(e) => {
                  const formatted = moment(e.target.value).format(
                    "YYYY-MM-DD HH:mm"
                  );
                  setFormData({
                    ...formData,
                    abatementDateTime: formatted,
                  });
                }}
              />
            </InputGroup>
          </FormControl>
        </CardBody>
      </CardHeader>
    </Card>
  );

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const addConditionMutation = useMutation({
    mutationFn: (data: any) => {
      return axiosWithCredentials
        .post("/record/condition/create", data)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          throw new Error();
        });
    },
  });

  const handleSubmitForm = () => {
    setFormData({
      ...formData,
      recordedDate: moment().format("YYYY-MM-DD HH:mm"),
    });
    console.log(JSON.stringify(formData));
    addConditionMutation.mutate(formData);
  };

  return (
    <div className="w-[80vw]">
      <Form
        className="w-full flex flex-col justify-center"
        onSubmit={handleSubmitForm}
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
          {Subject}
          {Recorder}
          {Asserter}
          {ClinicalStatus}
          {VerificationStatus}
          {Category}
          {Severity}
          {Code}
          {BodySite}
          {OnsetDateTime}
          {AbatementDateTime}
        </Stack>
        <Button
          type="submit"
          bgColor={"blue.500"}
          color={"white"}
          isLoading={addConditionMutation.isLoading}
        >
          Submit
        </Button>
        {addConditionMutation.isError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{"Something went wrong!"}</AlertTitle>
          </Alert>
        )}

        {addConditionMutation.isSuccess && !addConditionMutation.isError && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Add successful!</AlertTitle>
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default ConditionInputCard;
