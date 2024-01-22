import { useEffect, useState } from "react";
import { useFetchDoctorPatientListQuery } from "../../api/doctor";
import { useUserContext } from "../../model/user/userContext";
import {
  Button,
  Card,
  CardBody,
  Heading,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  chakra,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { renderComponent } from "../../utils/renderComponent";
import { useFetchUserDetailQuery } from "../../api/user";
import { FaCopy } from "react-icons/fa";
import { convertDatetimeString } from "../../utils";
import { SearchBar } from "../../components/SearchBar";
import Fuse from "fuse.js";
import { useFetchPatientListQuery } from "../../api/patient";
import { UserType } from "../../constants/user";
import { useNavigate } from "react-router-dom";
import { PiPlus } from "react-icons/pi";

const Patients = () => {
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
  }, [user, fetchUserData]);

  const {
    data: doctorPatientList,
    isLoading: isDoctorPatientListLoading,
    isError: isDoctorPatientListError,
    refetch: fetchDoctorPatientList,
  } = useFetchDoctorPatientListQuery(user?.address);

  const {
    data: totalPatientList,
    isLoading: isPatientListLoading,
    isError: isPatientListError,
    refetch: fetchPatientList,
  } = useFetchPatientListQuery();

  useEffect(() => {
    if (user?.address && user?.userType === UserType.DOCTOR) {
      fetchDoctorPatientList();
    }
  }, [user, fetchDoctorPatientList]);

  const [currSearch, setCurrSearch] = useState("");
  const [currentList, setCurrentList] = useState(
    user?.userType === UserType.DOCTOR
      ? doctorPatientList?.patients
      : totalPatientList?.patients
  );

  const options = {
    tokenize: false,
    matchAllTokens: false,
    threshold: 0.1,
    keys: [
      "primaryInfo.name",
      "primaryInfo.email",
      "primaryInfo.address",
      "primaryInfo.IC",
    ],
  };

  const fuse = new Fuse(
    user?.userType === UserType.DOCTOR
      ? doctorPatientList?.patients
      : totalPatientList?.patients,
    options
  );

  useEffect(() => {
    if (currSearch === "") {
      setCurrentList(
        user?.userType === UserType.DOCTOR
          ? doctorPatientList?.patients
          : totalPatientList?.patients
      );
    } else {
      setCurrentList(fuse.search(currSearch).map((data) => data.item));
    }
  }, [currSearch]);

  useEffect(() => {
    if (user?.userType === UserType.DOCTOR)
      setCurrentList(doctorPatientList?.patients);
    else if (user?.userType === UserType.ADMIN)
      setCurrentList(totalPatientList?.patients);
  }, [doctorPatientList, totalPatientList, user?.userType]);

  useEffect(() => {
    console.log(currentList);
  }, [currentList]);

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
              isLoading: isDoctorPatientListLoading,
              style: {
                height: "150px",
              },
            },
            error: {
              isError: isDoctorPatientListError,
              onErrorRetry: fetchDoctorPatientList,
            },
            component:
              currentList?.length === 0 ? (
                <Tr>
                  <Td colSpan={7} textAlign={"center"}>
                    No data found
                  </Td>
                </Tr>
              ) : (
                currentList
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

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start p-6 w-full">
      <Heading color="yellow.200" marginBottom={"24px"}>
        Your Patients
      </Heading>
      <SearchBar
        placeholder="Search patient name / address / email / IC"
        onChange={(value) => setCurrSearch(value)}
        onEnter={(value) => setCurrSearch(value)}
      />

      <Card
        width={"100%"}
        backgroundColor={"primaryBlue.300"}
        color="white"
        margin="6"
      >
        <CardBody>
          {renderComponent({
            loading: {
              isLoading:
                user?.userType === UserType.DOCTOR
                  ? isDoctorPatientListLoading
                  : isPatientListLoading,
              style: {
                height: "150px",
              },
            },
            error: {
              isError:
                user?.userType === UserType.DOCTOR
                  ? isDoctorPatientListError
                  : isPatientListError,
              onErrorRetry:
                user?.userType === UserType.DOCTOR
                  ? fetchDoctorPatientList
                  : fetchPatientList,
            },
            component: patientsTable,
          })}
        </CardBody>
      </Card>
    </div>
  );
};

export default Patients;
