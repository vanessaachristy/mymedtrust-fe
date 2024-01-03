import React, { useEffect } from "react";
import { useUserContext } from "../../model/user/userContext";
import { useFetchDoctorPatientListQuery } from "../../api/doctor";
import { UserType } from "../../constants/user";
import { useFetchUserDetailQuery } from "../../api/user";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
  Text,
} from "@chakra-ui/react";
import { User } from "../../types";
import { FaUserInjured } from "react-icons/fa6";
import { MdNoFood } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
} from "recharts";
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

  const patientsBarData = [
    {
      name: "Yours",
      totalPatients: Number(doctorPatientList?.patientList?.length),
    },
    {
      name: "All",
      totalPatients: 10,
    },
  ];

  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      width={"100%"}
      paddingY={6}
    >
      <Stack width={"45%"} direction={"column"} spacing={4}>
        <Card
          width={"100%"}
          height={"300px"}
          className="box-border bg-gradient-to-b  from-white to-primaryBlue-200"
        >
          <CardBody className="flex items-center">
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Stack
                direction={"column"}
                spacing={8}
                alignItems={"center"}
                paddingLeft={6}
              >
                <Stack direction={"column"} spacing={4} alignItems={"center"}>
                  <PatientIcon color="blue.600" size="30%" />
                  <Heading size="md" color="primaryBlue.400">
                    Your Patients
                  </Heading>
                </Stack>
                <Button
                  size="md"
                  backgroundColor={"#2937aa"}
                  color="white"
                  _hover={{
                    bg: "primaryBlue.500",
                  }}
                >
                  View Patients
                </Button>
              </Stack>
              {renderComponent({
                loading: {
                  isLoading: isDoctorPatientListLoading,
                  style: {
                    width: "400px",
                    height: "200px",
                  },
                },
                error: {
                  isError: isDoctorPatientListError,
                  onErrorRetry: fetchDoctorPatientList,
                  style: {
                    width: "400px",
                    height: "100px",
                  },
                },
                component: (
                  <>
                    <div>
                      <BarChart
                        width={400}
                        height={250}
                        data={patientsBarData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#1a202c" />
                        <YAxis stroke="#1a202c" />
                        <Tooltip />
                        <Bar
                          dataKey="totalPatients"
                          fill="#2937aa"
                          radius={[20, 20, 0, 0]}
                          activeBar={<Rectangle fill="#0053a1" />}
                        />
                      </BarChart>
                    </div>
                  </>
                ),
              })}
            </Stack>
          </CardBody>
        </Card>
        <Card
          width={"100%"}
          height={"300px"}
          className="box-border bg-gradient-to-b  from-primaryBlue-200 to-primaryBlue-400"
        ></Card>
      </Stack>
      <Stack width={"50%"} direction={"row"} spacing={2} flexWrap={"wrap"}>
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
          {observationsList
            ?.concat(observationsList)
            .slice(0, 5)
            ?.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
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
            })}
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
          {conditionList
            ?.concat(conditionList)
            .slice(0, 5)
            ?.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
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
            })}
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
          {medicationList
            ?.slice(0, 5)
            ?.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
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
            })}
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
          {allergyList
            ?.slice(0, 5)
            ?.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
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
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );

  const navigate = useNavigate();
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      width={"100%"}
      paddingY={6}
    >
      <Stack width={"100%"} direction={"row"} spacing={6} flexWrap={"wrap"}>
        <Card
          width={"48%"}
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
        <Card width={"48%"} backgroundColor={"primaryBlue.400"} color="white">
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
        <Card width={"48%"} backgroundColor={"primaryBlue.400"} color="white">
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
        <Card width={"48%"} backgroundColor={"primaryBlue.400"} color="white">
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
  );
};
const Home = () => {
  const { user, setUser } = useUserContext();
  const { data: userData, refetch: fetchUserData } = useFetchUserDetailQuery();
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);
  useEffect(() => {
    console.log(user);
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
      {user?.userType === UserType.DOCTOR && <DoctorDashboard user={user} />}
      {user?.userType === UserType.PATIENT && <PatientDashboard user={user} />}
    </div>
  );
};

export default Home;
