import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useUserContext } from "../../model/user/userContext";
import {
  useFetchDoctorListQuery,
  useFetchDoctorPatientListQuery,
} from "../../api/doctor";
import { UserType } from "../../constants/user";
import { useFetchUserDetailQuery } from "../../api/user";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Skeleton,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tooltip,
  chakra,
  useToast,
  useClipboard,
  Box,
} from "@chakra-ui/react";
import { User } from "../../types";
import {
  FaCopy,
  FaFileMedical,
  FaUserDoctor,
  FaUserGroup,
  FaUserInjured,
} from "react-icons/fa6";
import { MdNoFood } from "react-icons/md";
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import { GiMedicinePills } from "react-icons/gi";
import { FaFileMedicalAlt } from "react-icons/fa";
import { renderComponent } from "../../utils/renderComponent";
import { useNavigate } from "react-router-dom";
import { useGetObservationsQuery } from "../../api/observation";
import { convertDatetimeString } from "../../utils";
import { useGetConditionQuery } from "../../api/condition";
import { useGetAllergyQuery } from "../../api/allergy";
import { useGetMedicationQuery } from "../../api/medication";
import {
  useFetchRecordsList,
  useGetRecordByPatientQuery,
} from "../../api/record";
import ReusableModal from "../../components/Modal";
import ObservationCard from "../../components/ObservationCard";
import MedicationCard from "../../components/MedicationCard";
import ConditionCard from "../../components/ConditionCard";
import AllergyCard from "../../components/AllergyCard";
import { useMutation } from "react-query";
import axiosWithCredentials from "../../api/fetch";
import { useFetchPatientListQuery } from "../../api/patient";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
} from "recharts";

type DashboardProps = {
  user: User;
};
const DoctorDashboard = ({ user }: DashboardProps) => {
  const PatientIcon = chakra(FaUserInjured);
  const MedicationIcon = chakra(GiMedicinePills);
  const ObservationIcon = chakra(PiFileMagnifyingGlassFill);
  const AllergyIcon = chakra(MdNoFood);
  const ConditionIcon = chakra(FaFileMedicalAlt);

  const navigate = useNavigate();

  const {
    data: doctorPatientList,
    isLoading: isDoctorPatientListLoading,
    isError: isDoctorPatientListError,
    refetch: fetchDoctorPatientList,
  } = useFetchDoctorPatientListQuery(user?.address);

  useEffect(() => {
    if (user?.userType === UserType.DOCTOR && user?.address) {
      fetchDoctorPatientList();
    }
  }, [user, fetchDoctorPatientList]);

  const {
    data: totalPatientList,
    isLoading: isPatientListLoading,
    isError: isPatientListError,
    refetch: fetchPatientList,
  } = useFetchPatientListQuery();

  const patientChartOptions: ApexOptions = {
    legend: {
      show: false,
    },
    labels: ["Your Patients", "Others"],
    colors: ["#3836af", "#1d1c66"],
  };
  const patientChartSeries = [
    Number(doctorPatientList?.total),
    // Number(totalPatientList?.total) - Number(doctorPatientList?.total),
    19,
  ];

  const recordChartSeries = [44, 55, 41, 17];

  const recordChartOptions = {
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
      colors: ["#219ebc", "#023047", "#ba324f", "#fb8500"],
    },
    colors: ["#219ebc", "#023047", "#ba324f", "#fb8500"],

    labels: ["Observation", "Condition", "Medication", "Allergy"],
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      width={"100%"}
      paddingY={6}
    >
      <Stack width={"40%"} direction={"column"} spacing={4}>
        <Card
          width={"100%"}
          height={"300px"}
          className="box-border bg-gradient-to-b  from-white to-primaryBlue-200 pb-12"
        >
          <CardHeader paddingBottom={0}>
            <Heading size="md">Your Patients</Heading>
          </CardHeader>
          <CardBody className="flex items-center">
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={0}
            >
              {renderComponent({
                loading: {
                  isLoading: isDoctorPatientListLoading && isPatientListLoading,
                  style: {
                    width: "400px",
                    height: "200px",
                  },
                },
                error: {
                  isError: isDoctorPatientListError || isPatientListError,
                  onErrorRetry: () => {
                    fetchDoctorPatientList();
                    fetchPatientList();
                  },
                  style: {
                    width: "400px",
                    height: "100px",
                  },
                },
                component: (
                  <>
                    <div className="max-w-[250px]">
                      <ReactApexChart
                        options={patientChartOptions}
                        series={patientChartSeries}
                        type="pie"
                        width={"100%"}
                      />
                    </div>
                    <Stack
                      direction={"column"}
                      spacing={4}
                      alignItems={"left"}
                      justifyContent={"center"}
                    >
                      <Stack
                        direction="row"
                        h="100px"
                        spacing={4}
                        divider={<StackDivider borderColor="blackAlpha.300" />}
                        alignItems="center"
                      >
                        <Stack direction={"column"} spacing={0}>
                          <Heading size="sm" color="blackAlpha.600">
                            Yours
                          </Heading>
                          <Heading size="xl">
                            {Number(doctorPatientList?.total)}
                          </Heading>
                        </Stack>
                        <Stack direction={"column"} spacing={0}>
                          <Heading size="sm" color="blackAlpha.600">
                            Total Patients
                          </Heading>
                          <Heading size="xl">
                            {Number(totalPatientList?.total)}
                          </Heading>
                        </Stack>
                      </Stack>

                      <Button
                        size="md"
                        backgroundColor={"#2937aa"}
                        color="white"
                        _hover={{
                          bg: "primaryBlue.500",
                        }}
                        onClick={() => {
                          navigate("/patients");
                        }}
                        width="80%"
                      >
                        View Patients
                      </Button>
                    </Stack>
                  </>
                ),
              })}
            </Stack>
          </CardBody>
        </Card>
        <Card
          width={"100%"}
          height={"300px"}
          className="box-border bg-gradient-to-b  from-white to-primaryBlue-200 pb-12"
        >
          <CardHeader paddingBottom={0}>
            <Heading size="md">Records Created By You</Heading>
          </CardHeader>
          <CardBody className="flex items-center">
            <Stack
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={0}
              width={"75%"}
            >
              <div className="w-full">
                <ReactApexChart
                  options={recordChartOptions}
                  series={recordChartSeries}
                  type="donut"
                />
              </div>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
      <Stack width={"60%"} direction={"row"} spacing={2} flexWrap={"wrap"}>
        <Card width={"48%"} backgroundColor={"primaryBlue.400"} color="white">
          <CardBody className="flex flex-col justify-center items-center">
            <Stack direction={"column"} spacing={8} alignItems={"center"}>
              <Stack direction={"column"} spacing={4} alignItems={"center"}>
                <ObservationIcon color="whiteAlpha.800" size="80px" />
                <Heading size="md">Observations</Heading>
              </Stack>
              <Button
                size="md"
                backgroundColor={"primaryBlue.50"}
                color={"primaryBlue.500"}
                onClick={() => {
                  navigate("/observations/add");
                }}
              >
                Add Observation
              </Button>
            </Stack>
          </CardBody>
        </Card>
        <Card width={"48%"} backgroundColor={"primaryBlue.400"} color="white">
          <CardBody className="flex flex-col justify-center items-center">
            <Stack direction={"column"} spacing={8} alignItems={"center"}>
              <Stack direction={"column"} spacing={4} alignItems={"center"}>
                <ConditionIcon color="whiteAlpha.800" size="80px" />
                <Heading size="md">Conditions</Heading>
              </Stack>
              <Button
                backgroundColor={"primaryBlue.50"}
                color={"primaryBlue.500"}
                onClick={() => {
                  navigate("/conditions/add");
                }}
              >
                Add Condition
              </Button>
            </Stack>
          </CardBody>
        </Card>
        <Card width={"48%"} backgroundColor={"primaryBlue.400"} color="white">
          <CardBody className="flex flex-col justify-center items-center">
            <Stack direction={"column"} spacing={8} alignItems={"center"}>
              <Stack direction={"column"} spacing={4} alignItems={"center"}>
                <MedicationIcon color="whiteAlpha.800" size="80px" />
                <Heading size="md">Medications</Heading>
              </Stack>
              <Button
                size="md"
                backgroundColor={"primaryBlue.50"}
                color={"primaryBlue.500"}
                onClick={() => {
                  navigate("/medications/add");
                }}
              >
                Add Medication
              </Button>
            </Stack>
          </CardBody>
        </Card>
        <Card width={"48%"} backgroundColor={"primaryBlue.400"} color="white">
          <CardBody className="flex flex-col justify-center items-center">
            <Stack direction={"column"} spacing={8} alignItems={"center"}>
              <Stack direction={"column"} spacing={4} alignItems={"center"}>
                <AllergyIcon color="whiteAlpha.800" size="80px" />
                <Heading size="md">Allergy</Heading>
              </Stack>
              <Button
                size="md"
                backgroundColor={"primaryBlue.50"}
                color={"primaryBlue.500"}
                onClick={() => {
                  navigate("/allergy/add");
                }}
              >
                Add Allergy
              </Button>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Stack>
  );
};

const PatientDashboard = ({ user }: DashboardProps) => {
  const MedicationIcon = chakra(GiMedicinePills);
  const ObservationIcon = chakra(PiFileMagnifyingGlassFill);
  const AllergyIcon = chakra(MdNoFood);
  const ConditionIcon = chakra(FaFileMedicalAlt);

  const {
    data: patientRecordList,
    isLoading: isPatientRecordListLoading,
    isError: isPatientRecordListError,
    refetch: fetchPatientRecord,
  } = useGetRecordByPatientQuery(user?.address);

  const [isRecordLoading, setIsRecordLoading] = useState(
    isPatientRecordListLoading
  );
  useEffect(() => {
    setIsRecordLoading(isPatientRecordListLoading);
  }, [isPatientRecordListLoading]);

  useEffect(() => {
    if (user?.address) {
      fetchPatientRecord();
    }
  }, [user, fetchPatientRecord]);

  const [recordMetadatas, setRecordMetadatas] = useState<{
    timestamp: string;
    issuer: string;
    issuerName: string;
    category: string;
    account: string;
    encryptedID: string;
    dataHash: string;
    recordStatus: number;
  }>({
    timestamp: "",
    issuer: "",
    issuerName: "",
    category: "",
    account: user?.address,
    encryptedID: "",
    dataHash: "",
    recordStatus: 0,
  });
  const [modalData, setModalData] = useState<ReactNode>(<></>);
  const [showModal, setShowModal] = useState(false);

  const enum ModalType {
    "Approve",
    "Decline",
  }
  const [modalType, setModalType] = useState(ModalType.Approve);

  const pendingApprovalTable = (
    <TableContainer width={"100%"} color={"white"}>
      <Table variant="striped" colorScheme="whiteAlpha" size="sm" color="white">
        <Thead>
          <Tr>
            <Th color="white">Date</Th>
            <Th color="white">Issuer</Th>
            <Th color="white">Category</Th>
            <Th color="white">Name</Th>
            <Th color="white">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patientRecordList
            ?.filter((item) => item?.recordStatus === 0)
            ?.slice(0, 5)
            ?.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
            ?.map((item: any, index: number) => {
              return (
                <Tr>
                  <Td>{convertDatetimeString(item.timestamp.toString())}</Td>
                  <Td>{item?.issuerDoctorName}</Td>
                  <Td>{item?.data?.resourceType}</Td>
                  <Td>{item?.data?.code?.coding?.[0]?.display}</Td>

                  <Td>
                    <Button
                      size="sm"
                      backgroundColor={"primaryBlue.50"}
                      onClick={() => {
                        setRecordMetadatas({
                          timestamp: item?.timestamp?.toString(),
                          issuer: item?.issuerDoctorAddr?.toString(),
                          issuerName: item?.issuerDoctorName?.toString(),
                          category: item?.data?.resourceType?.toString(),
                          account: user?.address,
                          encryptedID: item?.encryptedID,
                          dataHash: item?.dataHash,
                          recordStatus: 1,
                        });
                        switch (item?.data?.resourceType) {
                          case "Observation":
                            setModalData(<ObservationCard data={item?.data} />);
                            break;
                          case "Condition":
                            setModalData(<ConditionCard data={item?.data} />);
                            break;
                          case "Medication":
                            setModalData(<MedicationCard data={item?.data} />);
                            break;
                          case "AllergyIntolerance":
                            setModalData(<AllergyCard data={item?.data} />);
                            break;
                          default:
                            setModalData(<></>);
                        }
                        setModalType(ModalType.Approve);
                        setShowModal(true);
                      }}
                      marginRight={"6px"}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      backgroundColor={"primaryBlue.300"}
                      _hover={{
                        bg: "primaryBlue.400",
                      }}
                      color="white"
                      onClick={() => {
                        setRecordMetadatas({
                          timestamp: item?.timestamp?.toString(),
                          issuer: item?.issuerDoctorAddr?.toString(),
                          issuerName: item?.issuerDoctorName?.toString(),
                          category: item?.data?.resourceType?.toString(),
                          account: user?.address,
                          encryptedID: item?.encryptedID,
                          dataHash: item?.dataHash,
                          recordStatus: 2,
                        });
                        switch (item?.data?.resourceType) {
                          case "Observation":
                            setModalData(<ObservationCard data={item?.data} />);
                            break;
                          case "Condition":
                            setModalData(<ConditionCard data={item?.data} />);
                            break;
                          case "Medication":
                            setModalData(<MedicationCard data={item?.data} />);
                            break;
                          case "AllergyIntolerance":
                            setModalData(<AllergyCard data={item?.data} />);
                            break;
                          default:
                            setModalData(<></>);
                        }
                        setModalType(ModalType.Decline);
                        setShowModal(true);
                      }}
                    >
                      Decline
                    </Button>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );

  const editRecordMutation = useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await axiosWithCredentials.post("/record/edit", data);
      } catch (error) {}
    },
    onSuccess: () => {
      toast({
        title: "Thank You!",
        description: `${
          modalType === ModalType.Approve ? "Approval" : "Decline"
        } Success`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setShowModal(false);
      setIsRecordLoading(true);
      fetchPatientRecord().then(() => {
        setIsRecordLoading(false);
      });
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An error occurred during the request.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      throw new Error();
    },
  });

  const approvalModal = (
    <ReusableModal
      title={`Approve ${recordMetadatas?.category}`}
      content={
        <>
          <Stack direction={"column"} paddingBottom={"10px"} spacing={2}>
            <div className="text-md font-semibold">Issuer</div>
            <div> {recordMetadatas?.issuerName}</div>
          </Stack>
          <Stack direction={"column"} paddingBottom={"6px"} spacing={2}>
            <div className="text-md font-semibold">Issued on</div>
            <div>
              {convertDatetimeString(recordMetadatas?.timestamp?.toString())}
            </div>
          </Stack>
          {modalData}
        </>
      }
      onOk={() => {
        editRecordMutation.mutate(recordMetadatas);
      }}
      okTitle="Approve"
      onClose={() => setShowModal(false)}
      isOpen={showModal}
    />
  );

  const declineModal = (
    <ReusableModal
      title={`Decline ${recordMetadatas?.category}`}
      content={
        <>
          <Stack direction={"column"} paddingBottom={"10px"} spacing={2}>
            <div className="text-md font-semibold">Issuer</div>
            <div> {recordMetadatas?.issuerName}</div>
          </Stack>
          <Stack direction={"column"} paddingBottom={"6px"} spacing={2}>
            <div className="text-md font-semibold">Issued on</div>
            <div>
              {convertDatetimeString(recordMetadatas?.timestamp?.toString())}
            </div>
          </Stack>
          {modalData}
        </>
      }
      onOk={() => {
        editRecordMutation.mutate(recordMetadatas);
      }}
      okTitle="Decline"
      onClose={() => setShowModal(false)}
      isOpen={showModal}
    />
  );

  const {
    data: observationsList,
    isLoading: isObservationListLoading,
    isError: isObservationListError,
    refetch: fetchObservations,
  } = useGetObservationsQuery(user?.address);

  useEffect(() => {
    if (user?.address) {
      fetchObservations();
    }
  }, [user, fetchObservations]);

  const observationTable = (
    <TableContainer width={"100%"} color={"white"}>
      <Table variant="striped" colorScheme="whiteAlpha" size="sm" color="white">
        <Thead>
          <Tr>
            <Th color="white">Date</Th>
            <Th color="white">Name</Th>
            <Th color="white">Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {observationsList?.length === 0 ? (
            <Tr>
              <Td colSpan={3} textAlign={"center"} height="100px">
                No data
              </Td>
            </Tr>
          ) : (
            observationsList
              ?.slice(0, 5)
              ?.sort(
                (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
              )
              ?.map((item: any, index: number) => {
                return (
                  <Tr>
                    <Td>{convertDatetimeString(item.timestamp.toString())}</Td>
                    <Td>{item.code?.coding?.[0]?.display}</Td>
                    <Td>
                      <Badge colorScheme="blue">{item?.status}</Badge>
                    </Td>
                  </Tr>
                );
              })
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );

  const {
    data: conditionList,
    isLoading: isConditionListLoading,
    isError: isConditionListError,
    refetch: fetchConditions,
  } = useGetConditionQuery(user?.address);

  useEffect(() => {
    if (user?.address) {
      fetchConditions();
    }
  }, [user, fetchConditions]);

  const conditionsTable = (
    <TableContainer width={"100%"}>
      <Table variant="striped" colorScheme="whiteAlpha" size="sm" color="white">
        <Thead color={"white"}>
          <Tr>
            <Th color="white">Date</Th>
            <Th color="white">Name</Th>
            <Th color="white">Clinical Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {conditionList?.length === 0 ? (
            <Tr>
              <Td colSpan={3} textAlign={"center"} height="100px">
                No data
              </Td>
            </Tr>
          ) : (
            conditionList
              ?.slice(0, 5)
              ?.sort(
                (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
              )
              ?.map((item: any, index: number) => {
                return (
                  <Tr>
                    <Td>{convertDatetimeString(item.timestamp.toString())}</Td>
                    <Td>{item.code?.coding?.[0]?.display}</Td>
                    <Td>
                      <Badge colorScheme="blue">
                        {item?.clinicalStatus?.coding?.[0]?.code}
                      </Badge>
                    </Td>
                  </Tr>
                );
              })
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );

  const {
    data: medicationList,
    isLoading: isMedicationListLoading,
    isError: isMedicationListError,
    refetch: fetchMedications,
  } = useGetMedicationQuery(user?.address);

  useEffect(() => {
    if (user?.address) {
      fetchMedications();
    }
  }, [user, fetchMedications]);

  const medicationsTable = (
    <TableContainer width={"100%"}>
      <Table variant="striped" colorScheme="whiteAlpha" size="sm" color="white">
        <Thead>
          <Tr>
            <Th color="white">Date</Th>
            <Th color="white">Name</Th>
            <Th color="white">Form</Th>
          </Tr>
        </Thead>
        <Tbody>
          {medicationList?.length === 0 ? (
            <Tr>
              <Td colSpan={3} textAlign={"center"} height="100px">
                No data
              </Td>
            </Tr>
          ) : (
            medicationList
              ?.slice(0, 5)
              ?.sort(
                (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
              )
              ?.map((item: any, index: number) => {
                return (
                  <Tr>
                    <Td>{convertDatetimeString(item.timestamp.toString())}</Td>
                    <Td>{item.code?.coding?.[0]?.display}</Td>
                    <Td>
                      <Badge colorScheme="blue">
                        {item?.form?.coding?.[0]?.display}
                      </Badge>
                    </Td>
                  </Tr>
                );
              })
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );

  const {
    data: allergyList,
    isLoading: isAllergyListLoading,
    isError: isAllergyListError,
    refetch: fetchAllergies,
  } = useGetAllergyQuery(user?.address);

  useEffect(() => {
    if (user?.address) {
      fetchAllergies();
    }
  }, [user, fetchAllergies]);

  const allergiesTable = (
    <TableContainer width={"100%"}>
      <Table variant="striped" colorScheme="whiteAlpha" size="sm" color="white">
        <Thead>
          <Tr>
            <Th color="white">Date</Th>
            <Th color="white">Name</Th>
            <Th color="white">Clinical Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allergyList?.length === 0 ? (
            <Tr>
              <Td colSpan={3} textAlign={"center"} height="100px">
                No data
              </Td>
            </Tr>
          ) : (
            allergyList
              ?.slice(0, 5)
              ?.sort(
                (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
              )
              ?.map((item: any, index: number) => {
                return (
                  <Tr>
                    <Td>{convertDatetimeString(item.timestamp.toString())}</Td>
                    <Td>{item.code?.coding?.[0]?.display}</Td>
                    <Td>
                      <Badge colorScheme="blue">
                        {item?.clinicalStatus?.coding?.[0]?.code}
                      </Badge>
                    </Td>
                  </Tr>
                );
              })
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );

  const navigate = useNavigate();
  const toast = useToast();
  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      width={"100%"}
      paddingY={6}
      spacing={6}
    >
      <Card
        width={"100%"}
        className="box-border bg-gradient-to-t from-primaryBlue-200 to-primaryBlue-400 text-white"
      >
        <CardBody className="flex flex-col justify-start items-center">
          <Stack
            direction={"row"}
            spacing={8}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
            paddingBottom={8}
          >
            <Stack direction={"row"} spacing={4} alignItems={"center"}>
              <ObservationIcon color="white" size="30px" />
              <Heading size="md" color="white">
                To Be Approved
              </Heading>
            </Stack>
            <Button
              size="sm"
              backgroundColor={"primaryBlue.50"}
              color={"primaryBlue.500"}
              onClick={() => {
                navigate("/records");
              }}
            >
              Browse All Records
            </Button>
          </Stack>
          {renderComponent({
            loading: {
              isLoading: isRecordLoading,
              style: {
                width: "100%",
                height: "160px",
              },
            },
            error: {
              isError: isPatientRecordListError,
              onErrorRetry: fetchPatientRecord,
            },
            component: pendingApprovalTable,
          })}
        </CardBody>
      </Card>
      {modalType === ModalType.Approve && approvalModal}
      {modalType === ModalType.Decline && declineModal}

      <Stack
        width={"100%"}
        direction={"column"}
        spacing={6}
        // flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <Stack direction="row" spacing={6} justifyContent="space-between">
          <Card width={"50%"} backgroundColor={"primaryBlue.400"} color="white">
            <CardBody className="flex flex-col justify-start items-center">
              <Stack
                direction={"row"}
                spacing={8}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                paddingBottom={8}
              >
                <Stack direction={"row"} spacing={4} alignItems={"center"}>
                  <ObservationIcon color="white" size="30px" />
                  <Heading size="md">Observations</Heading>
                </Stack>
                <Button
                  size="sm"
                  backgroundColor={"primaryBlue.50"}
                  color={"primaryBlue.500"}
                  onClick={() => {
                    navigate("/observations");
                  }}
                >
                  Browse All
                </Button>
              </Stack>
              {renderComponent({
                loading: {
                  isLoading: isObservationListLoading,
                  style: {
                    width: "100%",
                    height: "160px",
                  },
                },
                error: {
                  isError: isObservationListError,
                  onErrorRetry: fetchObservations,
                },
                component: observationTable,
              })}
            </CardBody>
          </Card>
          <Card width={"50%"} backgroundColor={"primaryBlue.400"} color="white">
            <CardBody className="flex flex-col justify-start items-center">
              <Stack
                direction={"row"}
                spacing={8}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                paddingBottom={8}
              >
                <Stack direction={"row"} spacing={4} alignItems={"center"}>
                  <ConditionIcon color="white" size="30px" />
                  <Heading size="md">Conditions</Heading>
                </Stack>
                <Button
                  size="sm"
                  backgroundColor={"primaryBlue.50"}
                  color={"primaryBlue.500"}
                  onClick={() => {
                    navigate("/conditions");
                  }}
                >
                  Browse All
                </Button>
              </Stack>
              {renderComponent({
                loading: {
                  isLoading: isConditionListLoading,
                  style: {
                    width: "100%",
                    height: "160px",
                  },
                },
                error: {
                  isError: isConditionListError,
                  onErrorRetry: fetchConditions,
                },
                component: conditionsTable,
              })}
            </CardBody>
          </Card>
        </Stack>
        <Stack direction="row" spacing={6} justifyContent="space-between">
          <Card width={"50%"} backgroundColor={"primaryBlue.400"} color="white">
            <CardBody className="flex flex-col justify-start items-center">
              <Stack
                direction={"row"}
                spacing={8}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                paddingBottom={8}
              >
                <Stack direction={"row"} spacing={4} alignItems={"center"}>
                  <MedicationIcon color="white" size="30px" />
                  <Heading size="md">Medications</Heading>
                </Stack>
                <Button
                  size="sm"
                  backgroundColor={"primaryBlue.50"}
                  color={"primaryBlue.500"}
                  onClick={() => {
                    navigate("/medications");
                  }}
                >
                  Browse All
                </Button>
              </Stack>
              {renderComponent({
                loading: {
                  isLoading: isMedicationListLoading,
                  style: {
                    width: "100%",
                    height: "160px",
                  },
                },
                error: {
                  isError: isMedicationListError,
                  onErrorRetry: fetchMedications,
                },
                component: medicationsTable,
              })}
            </CardBody>
          </Card>
          <Card width={"50%"} backgroundColor={"primaryBlue.400"} color="white">
            <CardBody className="flex flex-col justify-start items-center">
              <Stack
                direction={"row"}
                spacing={8}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                paddingBottom={8}
              >
                <Stack direction={"row"} spacing={4} alignItems={"center"}>
                  <AllergyIcon color="white" size="30px" />
                  <Heading size="md">Allergies</Heading>
                </Stack>
                <Button
                  size="sm"
                  backgroundColor={"primaryBlue.50"}
                  color={"primaryBlue.500"}
                  onClick={() => {
                    navigate("/allergies");
                  }}
                >
                  Browse All
                </Button>
              </Stack>
              {renderComponent({
                loading: {
                  isLoading: isAllergyListLoading,
                  style: {
                    width: "100%",
                    height: "160px",
                  },
                },
                error: {
                  isError: isAllergyListError,
                  onErrorRetry: fetchAllergies,
                },
                component: allergiesTable,
              })}
            </CardBody>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

const AdminDashboard = ({ user }: DashboardProps) => {
  const {
    data: patientList,
    isLoading: isPatientListLoading,
    isError: isPatientListError,
    refetch: fetchPatientList,
  } = useFetchPatientListQuery();

  const {
    data: doctorList,
    isLoading: isDoctorListLoading,
    isError: isDoctorListError,
    refetch: fetchDoctorList,
  } = useFetchDoctorListQuery();

  const {
    data: recordList,
    isLoading: isRecordListLoading,
    isError: isRecordListError,
    refetch: fetchRecordList,
  } = useFetchRecordsList();

  const CFaCopy = chakra(FaCopy);
  const {
    onCopy,
    value: copyAddress,
    setValue: setCopyAddress,
    hasCopied,
  } = useClipboard("");
  const toast = useToast();

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: "Address copied!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  }, [hasCopied]);

  const patientsTable = (
    <TableContainer width={"100%"} color={"white"}>
      <Table variant="striped" colorScheme="whiteAlpha" size="sm" color="white">
        <Thead paddingBottom={"12px"}>
          <Tr>
            <Th color="white">No.</Th>
            <Th color="white">Name</Th>
            <Th color="white">Address</Th>
            <Th color="white">IC</Th>
            <Th color="white">Gender</Th>
            <Th color="white">E-mail</Th>
            <Th color="white">User Since</Th>
          </Tr>
        </Thead>
        <Tbody>
          {renderComponent({
            loading: {
              isLoading: isPatientListLoading,
              style: {
                height: "150px",
              },
            },
            error: {
              isError: isPatientListError,
              onErrorRetry: fetchPatientList,
            },
            component:
              patientList?.patients?.length === 0 ? (
                <Tr>
                  <Td colSpan={7} textAlign={"center"}>
                    No data found
                  </Td>
                </Tr>
              ) : (
                patientList?.patients
                  ?.slice(0, 5)
                  ?.sort(
                    (a: any, b: any) =>
                      Date.parse(b.primaryInfo.userSince.timestamp) -
                      Date.parse(a.primaryInfo.userSince.timestamp)
                  )
                  ?.map((patient: any, index: number) => {
                    return (
                      <Tr>
                        <Td>{index + 1}</Td>
                        <Td>{patient?.primaryInfo?.name}</Td>
                        <Td>
                          <Tooltip
                            placement="top"
                            label={patient?.primaryInfo?.address}
                            fontSize="xs"
                          >
                            <div>
                              <CFaCopy
                                onMouseEnter={() => {
                                  setCopyAddress(patient?.primaryInfo?.address);
                                }}
                                onClick={onCopy}
                              />
                            </div>
                          </Tooltip>
                        </Td>
                        <Td>{patient?.primaryInfo?.IC}</Td>
                        <Td>{patient?.primaryInfo?.gender}</Td>
                        <Td>{patient?.primaryInfo?.email}</Td>
                        <Td>
                          {convertDatetimeString(
                            patient?.primaryInfo?.userSince?.toString()
                          )}
                        </Td>
                      </Tr>
                    );
                  })
              ),
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );

  const patientStatsData = [
    {
      month: "Oct",
      patients: 25,
    },
    {
      month: "Nov",
      patients: 15,
    },
    {
      month: "Dec",
      patients: 10,
    },
    {
      month: "Jan",
      patients: 25,
    },
    {
      month: "Feb",
      patients: 25,
    },
    {
      month: "Mar",
      patients: 25,
    },
  ];

  const navigate = useNavigate();
  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      width={"100%"}
      paddingY={6}
      spacing={6}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        width="100%"
        spacing={6}
      >
        <Card
          backgroundColor={"primaryBlue.400"}
          color="white"
          width="33%"
          _hover={{
            bgGradient: "linear(to-r, primaryBlue.300, primaryBlue.400)",
            transform: "scale(1.05)",
            transition: "transform 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/patients");
          }}
        >
          <CardBody
            display="flex"
            flexDirection={"row"}
            justifyContent="space-between"
          >
            <Stack dir={"col"} justifyContent={"space-between"}>
              {renderComponent({
                loading: {
                  isLoading: isPatientListLoading,
                  style: {
                    height: "150px",
                  },
                },
                error: {
                  isError: isPatientListError,
                  onErrorRetry: fetchPatientList,
                },
                component: (
                  <Heading size="xl">{patientList?.patients?.length}</Heading>
                ),
              })}
              <Heading size="sm">Total Patients</Heading>
            </Stack>
            <Avatar size="xl" bg="primaryBlue.100" icon={<FaUserGroup />} />
          </CardBody>
        </Card>
        <Card
          backgroundColor={"primaryBlue.400"}
          color="white"
          width="33%"
          _hover={{
            bgGradient: "linear(to-r, primaryBlue.300, primaryBlue.400)",
            transform: "scale(1.05)",
            transition: "transform 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/doctors");
          }}
        >
          <CardBody
            display="flex"
            flexDirection={"row"}
            justifyContent="space-between"
          >
            <Stack dir={"col"} justifyContent={"space-between"}>
              {renderComponent({
                loading: {
                  isLoading: isDoctorListLoading,
                  style: {
                    height: "150px",
                  },
                },
                error: {
                  isError: isDoctorListError,
                  onErrorRetry: fetchDoctorList,
                },
                component: <Heading size="xl">{doctorList?.length}</Heading>,
              })}
              <Heading size="sm">Total Doctors</Heading>
            </Stack>
            <Avatar size="xl" bg="primaryBlue.100" icon={<FaUserDoctor />} />
          </CardBody>
        </Card>
        <Card
          backgroundColor={"primaryBlue.400"}
          color="white"
          width="33%"
          _hover={{
            bgGradient: "linear(to-r, primaryBlue.300, primaryBlue.400)",
            transform: "scale(1.05)",
            transition: "transform 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/records");
          }}
        >
          <CardBody
            display="flex"
            flexDirection={"row"}
            justifyContent="space-between"
          >
            <Stack dir={"col"} justifyContent={"space-between"}>
              {renderComponent({
                loading: {
                  isLoading: isRecordListLoading,
                  style: {
                    height: "150px",
                  },
                },
                error: {
                  isError: isRecordListError,
                  onErrorRetry: fetchRecordList,
                },
                component: <Heading size="xl">{recordList?.length}</Heading>,
              })}
              <Heading size="sm">Total Records</Heading>
            </Stack>
            <Avatar size="xl" bg="primaryBlue.100" icon={<FaFileMedical />} />
          </CardBody>
        </Card>
      </Stack>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        width="100%"
        spacing={6}
      >
        <Card backgroundColor={"primaryBlue.400"} color="white" width="50%">
          <CardHeader>
            <Heading size="md">Patients Statistics</Heading>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer>
              <BarChart width={600} height={300} data={patientStatsData}>
                <XAxis dataKey="month" stroke="#FFFFFF" />
                <YAxis stroke="#FFFFFF" />
                <ChartTooltip
                  labelStyle={{
                    color: "black",
                  }}
                  itemStyle={{
                    color: "black",
                  }}
                />
                <Bar dataKey="patients" fill="#FFFFFF" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
        <Card
          backgroundColor={"primaryBlue.400"}
          minHeight={"200px"}
          color="white"
          width="50%"
        >
          <CardHeader>
            <Heading size="md">Other Statistics</Heading>
          </CardHeader>
          <CardBody>
            <BarChart width={600} height={300} data={patientStatsData}>
              <XAxis dataKey="month" stroke="#FFFFFF" />
              <YAxis stroke="#FFFFFF" />
              <ChartTooltip
                labelStyle={{
                  color: "black",
                }}
                itemStyle={{
                  color: "black",
                }}
              />
              <Bar dataKey="patients" fill="#FFFFFF" barSize={30} />
            </BarChart>
          </CardBody>
        </Card>
      </Stack>
      <Card backgroundColor={"primaryBlue.400"} color="white">
        <CardHeader>
          <Heading size="md" display={"flex"} justifyContent={"space-between"}>
            Patients List
            <Button
              size="sm"
              backgroundColor={"primaryBlue.50"}
              color={"primaryBlue.500"}
              onClick={() => {
                navigate("/patients");
              }}
            >
              Browse All
            </Button>
          </Heading>
        </CardHeader>
        <CardBody>{patientsTable}</CardBody>
      </Card>
    </Stack>
  );
};
const Home = () => {
  const { user, setUser } = useUserContext();
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch: fetchUserData,
  } = useFetchUserDetailQuery();
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  useEffect(() => {
    if (!user.name && !user.IC && user.isLoggedIn) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  return (
    <div className="flex flex-col p-12 min-h-screen w-full">
      <Heading color="yellow.200" size={"md"}>
        Dashboard
      </Heading>
      <div className="text-white text-3xl font-semibold mb-12">
        Welcome, {user?.name}
      </div>
      {isUserLoading || user?.name === "" ? (
        <Stack direction={"column"} spacing={6} paddingY="12px">
          {[0, 1].map((_) => {
            return (
              <Stack direction={"row"} spacing={6}>
                {[0, 1, 2].map((_) => {
                  return (
                    <Skeleton
                      height="300px"
                      width="30%"
                      startColor="primaryBlue.100"
                      endColor="primaryBlue.200"
                      borderRadius={"md"}
                    />
                  );
                })}
              </Stack>
            );
          })}
        </Stack>
      ) : (
        <>
          {user?.userType === UserType.DOCTOR && (
            <DoctorDashboard user={user} />
          )}
          {user?.userType === UserType.PATIENT && (
            <PatientDashboard user={user} />
          )}
          {user?.userType === UserType.ADMIN && <AdminDashboard user={user} />}
        </>
      )}
    </div>
  );
};

export default Home;
