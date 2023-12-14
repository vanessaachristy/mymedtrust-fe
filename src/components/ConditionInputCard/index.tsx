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
import { Condition } from "fhir/r4";
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
import moment from "moment";
import { BsPatchCheckFill } from "react-icons/bs";

const ConditionInputCard = () => {
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
    if (user.email && user.address) {
      let recorder = {
        reference: `Practitioner/${user.address}`,
        display: user.email,
      };

      let asserter = {
        reference: `Practitioner/${user.address}`,
        display: user.email,
      };

      setFormData({
        ...formData,
        recorder: recorder,
        asserter: asserter,
      });
    }
  }, [user, fetchUserData]);

  const emptyFormData: Condition & {
    account: string;
    patient: string;
    doctor: string;
  } = {
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
  };

  const CBsPatchCheckFill = chakra(BsPatchCheckFill);

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
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData({
                    ...formData,
                    subject: {
                      ...formData?.subject,
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
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData({
                      ...formData,
                      subject: {
                        ...formData?.subject,
                        display: value,
                      },
                    });
                  }}
                />
              )}
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );
  const enum ClinicalStatusCode {
    ACTIVE = "active",
    RECURRENCE = "recurrence",
    RELAPSE = "relapse",
    INACTIVE = "inactive",
    REMISSION = "remission",
    RESOLVED = "resolved",
    UNKNOWN = "unknown",
  }

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
            <Select
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
            >
              <option value="http://terminology.hl7.org/CodeSystem/condition-clinical">
                http://terminology.hl7.org/CodeSystem/condition-clinical
              </option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Code</FormLabel>
            <Select
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
            >
              <option value={ClinicalStatusCode.ACTIVE}>
                {ClinicalStatusCode.ACTIVE}
              </option>
              <option value={ClinicalStatusCode.RECURRENCE}>
                {ClinicalStatusCode.RECURRENCE}
              </option>{" "}
              <option value={ClinicalStatusCode.INACTIVE}>
                {ClinicalStatusCode.INACTIVE}
              </option>
              <option value={ClinicalStatusCode.RELAPSE}>
                {ClinicalStatusCode.RELAPSE}
              </option>{" "}
              <option value={ClinicalStatusCode.REMISSION}>
                {ClinicalStatusCode.REMISSION}
              </option>
              <option value={ClinicalStatusCode.RESOLVED}>
                {ClinicalStatusCode.RESOLVED}
              </option>
              <option value={ClinicalStatusCode.UNKNOWN}>
                {ClinicalStatusCode.UNKNOWN}
              </option>
            </Select>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const enum VerificationStatusCode {
    UNCONFIRMED = "unconfirmed",
    PROVISIONAL = "provisional",
    DIFFERENTIAL = "differential",
    CONFIRMED = "confirmed",
    REFUTED = "refuted",
    ENTERED_IN_ERROR = "entered-in-error",
  }

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
            <Select
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
            >
              <option value="http://terminology.hl7.org/CodeSystem/condition-ver-status">
                http://terminology.hl7.org/CodeSystem/condition-ver-status
              </option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Code</FormLabel>

            <Select
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
            >
              <option value={VerificationStatusCode.CONFIRMED}>
                {VerificationStatusCode.CONFIRMED}
              </option>
              <option value={VerificationStatusCode.DIFFERENTIAL}>
                {VerificationStatusCode.DIFFERENTIAL}
              </option>{" "}
              <option value={VerificationStatusCode.ENTERED_IN_ERROR}>
                {VerificationStatusCode.ENTERED_IN_ERROR}
              </option>
              <option value={VerificationStatusCode.PROVISIONAL}>
                {VerificationStatusCode.PROVISIONAL}
              </option>{" "}
              <option value={VerificationStatusCode.REFUTED}>
                {VerificationStatusCode.REFUTED}
              </option>
              <option value={VerificationStatusCode.UNCONFIRMED}>
                {VerificationStatusCode.UNCONFIRMED}
              </option>
            </Select>
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
            <Select
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
            >
              <option value="http://terminology.hl7.org/CodeSystem/condition-category">
                http://terminology.hl7.org/CodeSystem/condition-category
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
          <FormControl>
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
          <FormControl>
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
          <FormControl>
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

  const BodySite = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Body Site
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"row"} spacing={4}>
          <FormControl>
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
          <FormControl>
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
          <FormControl>
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

  const [addResponse, setAddResponse] = useState<any>(null);

  const addConditionMutation = useMutation({
    mutationFn: (data: any) => {
      return axiosWithCredentials
        .post("/record/condition/create", data)
        .then(function (response) {
          console.log(response.data);
          setAddResponse(response.data?.data);
        })
        .catch(function (error) {
          throw new Error();
        });
    },
  });

  const handleSubmitForm = () => {
    console.log(
      JSON.stringify({
        ...formData,
        recordedDate: moment().format("YYYY-MM-DD HH:mm"),
      })
    );
    addConditionMutation.mutate({
      ...formData,
      recordedDate: moment().format("YYYY-MM-DD HH:mm"),
    });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setFormData(emptyFormData);
    setModalOpen(false);
  };

  useEffect(() => {
    if (addConditionMutation.isSuccess && !addConditionMutation.isError) {
      setModalOpen(true);
    }
  }, [addConditionMutation.isSuccess, addConditionMutation.isError]);

  const navigate = useNavigate();

  const handleToConditionList = () => {
    navigate("/conditions");
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

        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={"center"}>
              Condition successfully added!
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
              <Button variant="solid" onClick={handleToConditionList}>
                Go to Conditions
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Form>
    </div>
  );
};

export default ConditionInputCard;
