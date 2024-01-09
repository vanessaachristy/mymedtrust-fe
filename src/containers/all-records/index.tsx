import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  color,
  useToast,
} from "@chakra-ui/react";
import { convertDatetimeString } from "../../utils";
import ObservationCard from "../../components/ObservationCard";
import ConditionCard from "../../components/ConditionCard";
import MedicationCard from "../../components/MedicationCard";
import AllergyCard from "../../components/AllergyCard";
import { ReactNode, useEffect, useState } from "react";
import { useGetRecordByPatientQuery } from "../../api/record";
import ReusableModal from "../../components/Modal";
import axiosWithCredentials from "../../api/fetch";
import { useMutation } from "react-query";
import { useUserContext } from "../../model/user/userContext";
import { useFetchUserDetailQuery } from "../../api/user";
import { renderComponent } from "../../utils/renderComponent";

const AllRecords = () => {
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

  const toast = useToast();
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
          {patientRecordList?.filter((item) => item.recordStatus === 0)
            ?.length === 0 ? (
            <Tr>
              <Td colSpan={5} textAlign={"center"} height="100px">
                No pending request
              </Td>
            </Tr>
          ) : (
            patientRecordList
              ?.filter((item) => item?.recordStatus === 0)
              ?.sort((a, b) => a?.data?.resourceType - b?.data?.resourceType)
              ?.sort(
                (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
              )
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
                              setModalData(
                                <ObservationCard data={item?.data} />
                              );
                              break;
                            case "Condition":
                              setModalData(<ConditionCard data={item?.data} />);
                              break;
                            case "Medication":
                              setModalData(
                                <MedicationCard data={item?.data} />
                              );
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
                              setModalData(
                                <ObservationCard data={item?.data} />
                              );
                              break;
                            case "Condition":
                              setModalData(<ConditionCard data={item?.data} />);
                              break;
                            case "Medication":
                              setModalData(
                                <MedicationCard data={item?.data} />
                              );
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
              })
          )}
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

  const approvedTable = (
    <TableContainer width={"100%"} color={"white"}>
      <Table variant="striped" colorScheme="whiteAlpha" size="sm" color="white">
        <Thead>
          <Tr>
            <Th color="white">Date</Th>
            <Th color="white">Issuer</Th>
            <Th color="white">Category</Th>
            <Th color="white">Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patientRecordList?.filter((item) => item?.recordStatus === 1)
            ?.length === 0 ? (
            <Tr>
              <Td colSpan={4} textAlign={"center"} height="100px">
                No approved request
              </Td>
            </Tr>
          ) : (
            patientRecordList
              ?.filter((item) => item?.recordStatus === 1)
              ?.sort(
                (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
              )
              ?.map((item: any, index: number) => {
                return (
                  <Tr>
                    <Td>{convertDatetimeString(item.timestamp.toString())}</Td>
                    <Td>{item?.issuerDoctorName}</Td>
                    <Td>{item?.data?.resourceType}</Td>
                    <Td>{item?.data?.code?.coding?.[0]?.display}</Td>
                  </Tr>
                );
              })
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );

  const declinedTable = (
    <TableContainer width={"100%"} color={"white"}>
      <Table variant="striped" colorScheme="whiteAlpha" size="sm" color="white">
        <Thead>
          <Tr>
            <Th color="white">Date</Th>
            <Th color="white">Issuer</Th>
            <Th color="white">Category</Th>
            <Th color="white">Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patientRecordList?.filter((item) => item?.recordStatus === 2)
            ?.length === 0 ? (
            <Tr>
              <Td colSpan={4} textAlign={"center"} height="100px">
                No declined request
              </Td>
            </Tr>
          ) : (
            patientRecordList
              ?.filter((item) => item?.recordStatus === 2)
              ?.sort(
                (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
              )
              ?.map((item: any, index: number) => {
                return (
                  <Tr>
                    <Td>{convertDatetimeString(item.timestamp.toString())}</Td>
                    <Td>{item?.issuerDoctorName}</Td>
                    <Td>{item?.data?.resourceType}</Td>
                    <Td>{item?.data?.code?.coding?.[0]?.display}</Td>
                  </Tr>
                );
              })
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
  return (
    <div className="flex flex-col items-center justify-start p-6 w-full">
      <Heading color="yellow.200" marginBottom={"24px"}>
        All Records
      </Heading>
      <Card
        width={"100%"}
        className="box-border bg-gradient-to-t from-primaryBlue-200 to-primaryBlue-400 text-white mb-4"
      >
        <CardHeader>
          <Heading size="md">To Be Approved</Heading>
        </CardHeader>
        <CardBody className="flex flex-col justify-start items-center">
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
      <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
        <Card
          width={"100%"}
          className="box-border bg-gradient-to-t from-primaryBlue-200 to-primaryBlue-400 text-white"
        >
          <CardHeader>
            <Heading size="md">Approved</Heading>
          </CardHeader>
          <CardBody className="flex flex-col justify-start items-center">
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
              component: approvedTable,
            })}
          </CardBody>
        </Card>
        <Card
          width={"100%"}
          className="box-border bg-gradient-to-t from-primaryBlue-200 to-primaryBlue-400 text-white"
        >
          <CardHeader>
            <Heading size="md">Declined</Heading>
          </CardHeader>
          <CardBody className="flex flex-col justify-start items-center">
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
              component: declinedTable,
            })}
          </CardBody>
        </Card>
      </Stack>
      {modalType === ModalType.Approve && approvalModal}
      {modalType === ModalType.Decline && declineModal}
    </div>
  );
};

export default AllRecords;
