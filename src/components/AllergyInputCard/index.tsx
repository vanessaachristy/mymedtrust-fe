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
import { AllergyIntolerance, Observation } from "fhir/r4";
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

const AllergyInputCard = () => {
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
      let recorder = {
        reference: `Practitioner/${user.address}`,
        display: user.email,
      };
      setFormData({
        ...formData,
        recorder: recorder,
      });
    }
  }, [user, fetchUserData]);

  const emptyFormData: AllergyIntolerance & {
    account: string;
    patientAddr: string;
    doctorAddr: string;
    additionalNote: string;
  } = {
    account: user.address,
    doctorAddr: user.address,
    patientAddr: "",
    resourceType: "AllergyIntolerance",
    clinicalStatus: {
      coding: [
        {
          system: "",
          code: "",
          display: "",
        },
      ],
    },
    verificationStatus: {
      coding: [
        {
          system: "",
          code: "",
          display: "",
        },
      ],
    },
    category: [],
    criticality: undefined,
    code: {
      coding: [
        {
          system: "",
          code: "",
          display: "",
        },
      ],
    },
    patient: {
      reference: "",
      display: "",
    },
    recorder: {
      reference: `Practitioner/${user.address}`,
      display: user.email,
    },
    recordedDate: "",
    reaction: [
      {
        manifestation: [
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
        substance: {
          coding: [
            {
              system: "",
              code: "",
              display: "",
            },
          ],
        },
        exposureRoute: {
          coding: [
            {
              system: "",
              code: "",
              display: "",
            },
          ],
        },
        description: "",
        severity: "mild",
      },
    ],
    additionalNote: "",
  };

  const [formData, setFormData] = useState<
    AllergyIntolerance & {
      account: string;
      patientAddr: string;
      doctorAddr: string;
      additionalNote: string;
    }
  >(emptyFormData);

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
              value={formData?.patientAddr}
              onChange={(e) => {
                const { value } = e.target;
                setFormData({
                  ...formData,
                  patientAddr: value,
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
  } = useFetchPatientDetailsQuery(formData?.patientAddr);

  useEffect(() => {
    // Trigger a refetch when formData?.patient changes and is valid
    if (validateAddress(formData?.patientAddr)) {
      fetchPatientDetails();
    }
  }, [formData?.patientAddr, fetchPatientDetails]);

  useEffect(() => {
    setFormData({
      ...formData,
      patient: {
        reference: `Patient/${patientDetails?.primaryInfo?.address}`,
        display: patientDetails?.primaryInfo?.name,
      },
    });
  }, [patientDetails]);

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
              placeholder="AllergyIntolerance"
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

  const Patient = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Patient
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

  const enum ClinicalStatusCode {
    ACTIVE = "active",
    INACTIVE = "inactive",
    RESOLVED = "resolved",
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
              <option value="http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical">
                http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical
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
                        display: value,
                      },
                    ],
                  },
                });
              }}
            >
              <option value={ClinicalStatusCode.ACTIVE}>
                {ClinicalStatusCode.ACTIVE}
              </option>

              <option value={ClinicalStatusCode.INACTIVE}>
                {ClinicalStatusCode.INACTIVE}
              </option>

              <option value={ClinicalStatusCode.RESOLVED}>
                {ClinicalStatusCode.RESOLVED}
              </option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Display</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Display"
                name="display"
                value={`${formData?.clinicalStatus?.coding?.[0].display
                  ?.charAt(0)
                  .toUpperCase()}${formData?.clinicalStatus?.coding?.[0].display?.slice(
                  1
                )}`}
                disabled
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const enum VerificationStatusCode {
    UNCONFIRMED = "unconfirmed",
    PRESUMED = "presumed",
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
              <option value="http://terminology.hl7.org/CodeSystem/allergyintolerance-verification">
                http://terminology.hl7.org/CodeSystem/allergyintolerance-verification
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
                        code: value.toLowerCase(),
                        display: value,
                      },
                    ],
                  },
                });
              }}
            >
              <option value={VerificationStatusCode.CONFIRMED}>
                {VerificationStatusCode.CONFIRMED}
              </option>
              <option value={VerificationStatusCode.PRESUMED}>
                {VerificationStatusCode.PRESUMED}
              </option>

              <option value={VerificationStatusCode.ENTERED_IN_ERROR}>
                {VerificationStatusCode.ENTERED_IN_ERROR}
              </option>

              <option value={VerificationStatusCode.REFUTED}>
                {VerificationStatusCode.REFUTED}
              </option>
              <option value={VerificationStatusCode.UNCONFIRMED}>
                {VerificationStatusCode.UNCONFIRMED}
              </option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Display</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Display"
                name="display"
                value={`${formData?.verificationStatus?.coding?.[0].display
                  ?.charAt(0)
                  .toUpperCase()}${formData?.verificationStatus?.coding?.[0].display?.slice(
                  1
                )}`}
                disabled
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const enum CategoryOption {
    FOOD = "food",
    ENVIRONMENT = "environment",
    MEDICATION = "medication",
    BIOLOGIC = "biologic",
  }
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
            <Select
              placeholder="Category"
              name="category"
              value={formData?.category?.[0]}
              onChange={(e) => {
                const { value } = e.target;
                setFormData({
                  ...formData,
                  category: [value as CategoryOption],
                });
              }}
            >
              <option value={CategoryOption.FOOD}>{CategoryOption.FOOD}</option>
              <option value={CategoryOption.BIOLOGIC}>
                {CategoryOption.BIOLOGIC}
              </option>
              <option value={CategoryOption.ENVIRONMENT}>
                {CategoryOption.ENVIRONMENT}
              </option>
              <option value={CategoryOption.MEDICATION}>
                {CategoryOption.MEDICATION}
              </option>
            </Select>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const enum CriticalityLevel {
    HIGH = "high",
    LOW = "low",
    UNABLE_TO_ASSESS = "unable-to-assess",
  }
  const Criticality = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Criticality
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"row"} spacing={4}>
          <FormControl isRequired>
            <Select
              placeholder="Criticality"
              name="criticality"
              value={formData?.criticality}
              onChange={(e) => {
                const { value } = e.target;
                setFormData({
                  ...formData,
                  criticality: value as CriticalityLevel,
                });
              }}
            >
              <option value={CriticalityLevel.LOW}>
                {CriticalityLevel.LOW}
              </option>
              <option value={CriticalityLevel.HIGH}>
                {CriticalityLevel.HIGH}
              </option>
              <option value={CriticalityLevel.UNABLE_TO_ASSESS}>
                {CriticalityLevel.UNABLE_TO_ASSESS}
              </option>
            </Select>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const enum SeverityLevel {
    MILD = "mild",
    MODERATE = "moderate",
    SEVERE = "severe",
  }

  const Reaction = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Reaction
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"column"} spacing={4}>
          <Stack spacing={2}>
            <Heading size="sm">Manifestation</Heading>
            <Stack direction={"row"} spacing={4}>
              <FormControl isRequired>
                <FormLabel>System</FormLabel>
                <Select
                  placeholder="System"
                  name="system"
                  value={
                    formData?.reaction?.[0].manifestation?.[0]?.coding?.[0]
                      .system
                  }
                  onChange={(e) => {
                    const { value } = e.target;
                    const coding =
                      formData?.reaction?.[0].manifestation?.[0]?.coding?.[0];
                    setFormData({
                      ...formData,
                      reaction: [
                        {
                          ...formData?.reaction?.[0],
                          manifestation: [
                            {
                              coding: [
                                {
                                  ...coding,
                                  system: value,
                                },
                              ],
                            },
                          ],
                        },
                      ],
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
                    value={
                      formData?.reaction?.[0].manifestation?.[0]?.coding?.[0]
                        .code
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      const coding =
                        formData?.reaction?.[0].manifestation?.[0]?.coding?.[0];
                      setFormData({
                        ...formData,
                        reaction: [
                          {
                            ...formData?.reaction?.[0],
                            manifestation: [
                              {
                                coding: [
                                  {
                                    ...coding,
                                    code: value,
                                  },
                                ],
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
                    value={
                      formData?.reaction?.[0].manifestation?.[0]?.coding?.[0]
                        .display
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      const coding =
                        formData?.reaction?.[0].manifestation?.[0]?.coding?.[0];
                      setFormData({
                        ...formData,
                        reaction: [
                          {
                            ...formData?.reaction?.[0],
                            manifestation: [
                              {
                                coding: [
                                  {
                                    ...coding,
                                    display: value,
                                  },
                                ],
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
          </Stack>
          <Divider color={"gray.300"} />
          <Stack spacing={2}>
            <Heading size="sm">Exposure Route</Heading>
            <Stack direction={"row"} spacing={4}>
              <FormControl>
                <FormLabel>System</FormLabel>
                <Select
                  placeholder="System"
                  name="system"
                  value={
                    formData?.reaction?.[0].exposureRoute?.coding?.[0].system
                  }
                  onChange={(e) => {
                    const { value } = e.target;
                    const coding =
                      formData?.reaction?.[0].exposureRoute?.coding?.[0];
                    setFormData({
                      ...formData,
                      reaction: [
                        {
                          ...formData?.reaction?.[0],
                          manifestation: formData?.reaction?.[0]?.manifestation
                            ? formData?.reaction?.[0]?.manifestation
                            : [],

                          exposureRoute: {
                            coding: [
                              {
                                ...coding,
                                system: value,
                              },
                            ],
                          },
                        },
                      ],
                    });
                  }}
                >
                  <option value="http://snomed.info/sct">
                    http://snomed.info/sct
                  </option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Code</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Code"
                    name="code"
                    value={
                      formData?.reaction?.[0].exposureRoute?.coding?.[0].code
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      const coding =
                        formData?.reaction?.[0].exposureRoute?.coding?.[0];
                      setFormData({
                        ...formData,
                        reaction: [
                          {
                            ...formData?.reaction?.[0],
                            manifestation: formData?.reaction?.[0]
                              ?.manifestation
                              ? formData?.reaction?.[0]?.manifestation
                              : [],
                            exposureRoute: {
                              coding: [
                                {
                                  ...coding,
                                  code: value,
                                },
                              ],
                            },
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
                    value={
                      formData?.reaction?.[0].exposureRoute?.coding?.[0].display
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      const coding =
                        formData?.reaction?.[0].exposureRoute?.coding?.[0];
                      setFormData({
                        ...formData,
                        reaction: [
                          {
                            ...formData?.reaction?.[0],
                            manifestation: formData?.reaction?.[0]
                              ?.manifestation
                              ? formData?.reaction?.[0]?.manifestation
                              : [],

                            exposureRoute: {
                              coding: [
                                {
                                  ...coding,
                                  display: value,
                                },
                              ],
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
          <Divider color={"gray.300"} />
          <Stack spacing={2}>
            <Heading size="sm">Substance</Heading>
            <Stack direction={"row"} spacing={4}>
              <FormControl>
                <FormLabel>System</FormLabel>
                <Select
                  placeholder="System"
                  name="system"
                  value={formData?.reaction?.[0].substance?.coding?.[0].system}
                  onChange={(e) => {
                    const { value } = e.target;
                    const coding =
                      formData?.reaction?.[0].substance?.coding?.[0];
                    setFormData({
                      ...formData,
                      reaction: [
                        {
                          ...formData?.reaction?.[0],
                          manifestation: formData?.reaction?.[0]?.manifestation
                            ? formData?.reaction?.[0]?.manifestation
                            : [],

                          substance: {
                            coding: [
                              {
                                ...coding,
                                system: value,
                              },
                            ],
                          },
                        },
                      ],
                    });
                  }}
                >
                  <option value="http://www.nlm.nih.gov/research/umls/rxnorm">
                    http://www.nlm.nih.gov/research/umls/rxnorm
                  </option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Code</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Code"
                    name="code"
                    value={formData?.reaction?.[0].substance?.coding?.[0].code}
                    onChange={(e) => {
                      const { value } = e.target;
                      const coding =
                        formData?.reaction?.[0].substance?.coding?.[0];
                      setFormData({
                        ...formData,
                        reaction: [
                          {
                            ...formData?.reaction?.[0],
                            manifestation: formData?.reaction?.[0]
                              ?.manifestation
                              ? formData?.reaction?.[0]?.manifestation
                              : [],
                            substance: {
                              coding: [
                                {
                                  ...coding,
                                  code: value,
                                },
                              ],
                            },
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
                    value={
                      formData?.reaction?.[0].substance?.coding?.[0].display
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      const coding =
                        formData?.reaction?.[0].substance?.coding?.[0];
                      setFormData({
                        ...formData,
                        reaction: [
                          {
                            ...formData?.reaction?.[0],
                            manifestation: formData?.reaction?.[0]
                              ?.manifestation
                              ? formData?.reaction?.[0]?.manifestation
                              : [],

                            substance: {
                              coding: [
                                {
                                  ...coding,
                                  display: value,
                                },
                              ],
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
          <Divider color={"gray.300"} />
          <Stack spacing={2}>
            <Heading size="sm">Description</Heading>
            <Stack direction={"row"} spacing={4}>
              <FormControl>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={formData?.reaction?.[0].description}
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormData({
                        ...formData,
                        reaction: [
                          {
                            ...formData?.reaction?.[0],
                            manifestation: formData?.reaction?.[0]
                              ?.manifestation
                              ? formData?.reaction?.[0]?.manifestation
                              : [],

                            description: value,
                          },
                        ],
                      });
                    }}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </Stack>
          <Divider color={"gray.300"} />
          <Stack spacing={2}>
            <Heading size="sm">Severity</Heading>
            <Stack direction={"row"} spacing={4}>
              <FormControl>
                <Select
                  placeholder="Severity"
                  name="severity"
                  value={formData?.reaction?.[0]?.severity}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData({
                      ...formData,
                      reaction: [
                        {
                          ...formData?.reaction?.[0],
                          manifestation: formData?.reaction?.[0]?.manifestation
                            ? formData?.reaction?.[0]?.manifestation
                            : [],

                          severity: value as SeverityLevel,
                        },
                      ],
                    });
                  }}
                >
                  <option value={SeverityLevel.MILD}>
                    {SeverityLevel.MILD}
                  </option>
                  <option value={SeverityLevel.MODERATE}>
                    {SeverityLevel.MODERATE}
                  </option>
                  <option value={SeverityLevel.SEVERE}>
                    {SeverityLevel.SEVERE}
                  </option>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );

  const RecordedDate = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Recorded Date
        </Heading>
        <CardBody>
          <FormControl>
            <InputGroup>
              <Input
                placeholder="Select Date"
                size="md"
                type="date"
                onChange={(e) => {
                  const formatted = moment(e.target.value).format("YYYY-MM-DD");
                  setFormData({
                    ...formData,
                    recordedDate: formatted,
                  });
                }}
              />
            </InputGroup>
          </FormControl>
        </CardBody>
      </CardHeader>
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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [addResponse, setAddResponse] = useState<any>(null);

  const addAllergyMutation = useMutation({
    mutationFn: (data: any) => {
      return axiosWithCredentials
        .post("/record/allergy/create", data)
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
    addAllergyMutation.mutate(formData);
  };

  const CBsPatchCheckFill = chakra(BsPatchCheckFill);

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setFormData(emptyFormData);
    setModalOpen(false);
  };

  useEffect(() => {
    if (addAllergyMutation.isSuccess && !addAllergyMutation.isError) {
      setModalOpen(true);
    }
  }, [addAllergyMutation.isSuccess, addAllergyMutation.isError]);

  const navigate = useNavigate();

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
          {PatientAddress}
          {ResourceType}
          {Patient}
          {Recorder}
          {ClinicalStatus}
          {VerificationStatus}
          {Code}
          {Reaction}
          {RecordedDate}
          {AdditionalNote}
          <Stack direction={"row"} spacing={4} width={"100%"}>
            <div className="basis-full">{Category}</div>
            <div className="basis-full">{Criticality}</div>
          </Stack>
        </Stack>
        <Button
          type="submit"
          isLoading={addAllergyMutation.isLoading}
          bgColor={"blue.500"}
          color={"white"}
        >
          Submit
        </Button>
      </Form>
      {addAllergyMutation.isError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{"Something went wrong!"}</AlertTitle>
        </Alert>
      )}

      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            Allergy successfully added!
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AllergyInputCard;
