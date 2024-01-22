import { useEffect, useState } from "react";
import {
  useFetchDoctorListQuery,
  useFetchDoctorPatientListQuery,
} from "../../api/doctor";
import { useUserContext } from "../../model/user/userContext";
import {
  Card,
  CardBody,
  Heading,
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
import { UserType } from "../../constants/user";

const Doctors = () => {
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
    data: doctorList,
    isLoading: isDoctorListLoading,
    isError: isDoctorListError,
    refetch: fetchDoctorList,
  } = useFetchDoctorListQuery();

  const [currSearch, setCurrSearch] = useState("");
  const [currentList, setCurrentList] = useState(doctorList);

  const options = {
    tokenize: false,
    matchAllTokens: false,
    threshold: 0.1,
    keys: [
      "primaryInfo.name",
      "primaryInfo.email",
      "qualification",
      "primaryInfo.address",
      "primaryInfo.IC",
    ],
  };

  const fuse = new Fuse(doctorList, options);

  useEffect(() => {
    if (currSearch === "") {
      setCurrentList(doctorList);
    } else {
      setCurrentList(fuse.search(currSearch).map((data) => data.item));
    }
  }, [currSearch]);

  useEffect(() => {
    setCurrentList(doctorList);
  }, [doctorList]);

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

  const doctorsTable = (
    <TableContainer width={"100%"} color={"white"}>
      <Table variant="striped" colorScheme="whiteAlpha" size="sm" color="white">
        <Thead paddingBottom={"12px"}>
          <Tr>
            <Th color="white">No.</Th>
            <Th color="white">Name</Th>
            <Th color="white">Address</Th>
            <Th color="white">Field</Th>
            <Th color="white">IC</Th>
            <Th color="white">Gender</Th>
            <Th color="white">E-mail</Th>
            <Th color="white">User Since</Th>
          </Tr>
        </Thead>
        <Tbody>
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
                  ?.map((doctor: any, index: number) => {
                    return (
                      <Tr>
                        <Td>{index + 1}</Td>
                        <Td>{doctor?.primaryInfo?.name}</Td>
                        <Td>
                          <Tooltip
                            width={"max-content"}
                            placement="top-start"
                            label={doctor?.primaryInfo?.address}
                            fontSize="xs"
                          >
                            <div>
                              <CFaCopy
                                onMouseEnter={() => {
                                  setCopyAddress(doctor?.primaryInfo?.address);
                                }}
                                onClick={onCopy}
                              />
                            </div>
                          </Tooltip>
                        </Td>
                        <Td>{doctor?.qualification}</Td>
                        <Td>{doctor?.primaryInfo?.IC}</Td>
                        <Td>{doctor?.primaryInfo?.gender}</Td>
                        <Td>{doctor?.primaryInfo?.email}</Td>
                        <Td>
                          {convertDatetimeString(
                            doctor?.primaryInfo?.userSince?.toString()
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

  return (
    <div className="flex flex-col items-center justify-start p-6 w-full">
      <Heading color="yellow.200" marginBottom={"24px"}>
        Doctors
      </Heading>
      <SearchBar
        placeholder="Search doctor name / address / field / email / IC"
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
              isLoading: isDoctorListLoading,
              style: {
                height: "150px",
              },
            },
            error: {
              isError: isDoctorListError,
              onErrorRetry: fetchDoctorList,
            },
            component: doctorsTable,
          })}
        </CardBody>
      </Card>
    </div>
  );
};

export default Doctors;
