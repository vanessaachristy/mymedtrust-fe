import { Medication } from "fhir/r4";
import {
  Heading,
  Stack,
  Badge,
  Button,
  Image,
  TabPanel,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  Box,
  Text,
  StackDivider,
} from "@chakra-ui/react";
import ReusableModal from "../Modal";
import { useState } from "react";
import { convertDatetimeString } from "../../utils";
import MedicationBg from "../../assets/Medication.png";

type MedicationCardProps = {
  data: Medication & {
    timestamp?: string;
  };
};
const MedicationCard = ({ data }: MedicationCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const detailsModal = (
    <ReusableModal
      title={`${data?.resourceType} | ${data?.code?.coding?.[0]?.display}`}
      content={
        <div>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Details</Tab>
              <Tab>Raw</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div>
                  <Stack divider={<StackDivider />}>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Status
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {data?.status}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Manufacturer
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        Reference: {data?.manufacturer?.reference}
                      </Text>
                      <Text fontSize="sm">
                        Display: {data?.manufacturer?.display}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Code
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        System: {data?.code?.coding?.[0]?.system}
                      </Text>
                      <Text fontSize="sm">
                        Code: {data?.code?.coding?.[0]?.code}
                      </Text>
                      <Text fontSize="sm">
                        Display: {data?.code?.coding?.[0]?.display}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Form
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        System: {data?.form?.coding?.[0]?.system}
                      </Text>
                      <Text fontSize="sm">
                        Code: {data?.form?.coding?.[0]?.code}
                      </Text>
                      <Text fontSize="sm">
                        Display: {data?.form?.coding?.[0]?.display}
                      </Text>
                    </Box>
                    <Box>
                      <Stack divider={<StackDivider />}>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Item Reference
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {data?.ingredient?.[0]?.itemReference?.reference}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Numerator
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            Value:{" "}
                            {data?.ingredient?.[0]?.strength?.numerator?.value}
                          </Text>
                          <Text fontSize="sm">
                            System:{" "}
                            {data?.ingredient?.[0]?.strength?.numerator?.system}
                          </Text>
                          <Text fontSize="sm">
                            Code:{" "}
                            {data?.ingredient?.[0]?.strength?.numerator?.code}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Denominator
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            Value:{" "}
                            {
                              data?.ingredient?.[0]?.strength?.denominator
                                ?.value
                            }
                          </Text>
                          <Text fontSize="sm">
                            System:{" "}
                            {
                              data?.ingredient?.[0]?.strength?.denominator
                                ?.system
                            }
                          </Text>
                          <Text fontSize="sm">
                            Code:{" "}
                            {data?.ingredient?.[0]?.strength?.denominator?.code}
                          </Text>
                        </Box>
                      </Stack>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Batch
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        Lot Number: {data?.batch?.lotNumber}
                      </Text>
                      <Text fontSize="sm">
                        Expiration Date: {data?.batch?.expirationDate}
                      </Text>
                    </Box>
                  </Stack>
                </div>
              </TabPanel>
              <TabPanel>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      }
      onClose={() => {
        setShowModal(false);
      }}
      isOpen={showModal}
    />
  );

  const CustomCard = (
    <div className="m-8 p-8 pt-4 flex flex-col justify-between bg-gradient-to-b  from-white to-primaryBlue-50 rounded-lg relative overflow-hidden">
      <div className="absolute -bottom-[30px] right-0 opacity-20 text-blue-300 z-0 w-[50%]">
        <Image src={MedicationBg} />
      </div>
      <div className="flex  pr-8 justify-between w-full z-10">
        <div className="pb-4 w-[50%]">
          <Heading size="md" color="gray.500">
            {data?.code?.coding?.[0]?.display}
          </Heading>
        </div>
        <Stack
          direction={"column"}
          spacing={1}
          width={"50%"}
          alignItems={"flex-end"}
          fontSize={"sm"}
        >
          <Badge fontSize="1em" colorScheme="blue">
            {data?.status ?? "Status Unknown"}
          </Badge>
          <div className="flex text-gray-600 font-semibold">
            Recorded on:
            <div className="text-black pl-4">
              {convertDatetimeString(data?.timestamp ?? "")}
            </div>
          </div>
        </Stack>
      </div>
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => setShowModal(true)}
        marginTop="8px"
      >
        {showModal ? "Close Details" : "View Details"}
      </Button>
      {detailsModal}
    </div>
  );

  return <div className="w-full">{CustomCard}</div>;
};

export default MedicationCard;
