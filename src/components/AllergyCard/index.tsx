import {
  Heading,
  Stack,
  Badge,
  Button,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";
import { AllergyIntolerance } from "fhir/r4";
import ReusableModal from "../Modal";
import { useState } from "react";
import AllergyBg from "../../assets/Allergy.png";
import { clinicalStatusColor, criticalityColor } from "../../constants/record";

type AllergyCardProps = {
  data: AllergyIntolerance;
};
const AllergyCard = ({ data }: AllergyCardProps) => {
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
                        Category
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {data?.category}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Criticality
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {data?.criticality}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Clinical Status
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        System: {data?.clinicalStatus?.coding?.[0]?.system}
                      </Text>
                      <Text fontSize="sm">
                        Code: {data?.clinicalStatus?.coding?.[0]?.code}
                      </Text>
                      <Text fontSize="sm">
                        Display: {data?.clinicalStatus?.coding?.[0]?.display}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Verification Status
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        System: {data?.verificationStatus?.coding?.[0]?.system}
                      </Text>
                      <Text fontSize="sm">
                        Code: {data?.verificationStatus?.coding?.[0]?.code}
                      </Text>
                      <Text fontSize="sm">
                        Display:{" "}
                        {data?.verificationStatus?.coding?.[0]?.display}
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
                        Patient
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        Reference: {data?.patient?.reference}
                      </Text>
                      <Text fontSize="sm">
                        Display: {data?.patient?.display}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Recorder
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        Reference: {data?.recorder?.reference}
                      </Text>
                      <Text fontSize="sm">
                        Display: {data?.recorder?.display}
                      </Text>
                    </Box>
                    <Box>
                      <Stack divider={<StackDivider />}>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Manifestation
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            System:{" "}
                            {
                              data?.reaction?.[0]?.manifestation?.[0]
                                ?.coding?.[0]?.system
                            }
                          </Text>
                          <Text fontSize="sm">
                            Code:{" "}
                            {
                              data?.reaction?.[0]?.manifestation?.[0]
                                ?.coding?.[0]?.code
                            }
                          </Text>
                          <Text fontSize="sm">
                            Display:
                            {
                              data?.reaction?.[0]?.manifestation?.[0]
                                ?.coding?.[0]?.display
                            }
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Substance
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            System:{" "}
                            {
                              data?.reaction?.[0]?.substance?.coding?.[0]
                                ?.system
                            }
                          </Text>
                          <Text fontSize="sm">
                            Code:{" "}
                            {data?.reaction?.[0]?.substance?.coding?.[0]?.code}
                          </Text>
                          <Text fontSize="sm">
                            Display:
                            {
                              data?.reaction?.[0]?.substance?.coding?.[0]
                                ?.display
                            }
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Exposure Route
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            System:{" "}
                            {
                              data?.reaction?.[0]?.exposureRoute?.coding?.[0]
                                ?.system
                            }
                          </Text>
                          <Text fontSize="sm">
                            Code:{" "}
                            {
                              data?.reaction?.[0]?.exposureRoute?.coding?.[0]
                                ?.code
                            }
                          </Text>
                          <Text fontSize="sm">
                            Display:
                            {
                              data?.reaction?.[0]?.exposureRoute?.coding?.[0]
                                ?.display
                            }
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Description
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {data?.reaction?.[0]?.description}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Severity
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {data?.reaction?.[0]?.severity}
                          </Text>
                        </Box>
                      </Stack>
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
      <div className="absolute -bottom-[250px] right-0 opacity-20 text-blue-300 z-0 w-[50%]">
        <Image src={AllergyBg} />
      </div>
      <div className="flex  pr-8 justify-between w-full z-10">
        <div className="pb-4 w-[50%]">
          <Heading size="md" color="gray.500">
            {data?.code?.coding?.[0]?.display}
          </Heading>
          <div>
            <Badge fontSize="1em" colorScheme="orange">
              {data?.category}
            </Badge>
            <Badge
              ml="1"
              fontSize="1em"
              colorScheme={
                criticalityColor[
                  data?.criticality?.toUpperCase() ?? "UNABLE-TO-ASSESS"
                ]
              }
            >
              {data?.criticality} Criticality
            </Badge>
          </div>
        </div>
        <Stack
          direction={"column"}
          spacing={1}
          width={"50%"}
          alignItems={"flex-end"}
          fontSize={"sm"}
        >
          <div>
            <Badge
              fontSize="1em"
              colorScheme={
                clinicalStatusColor[
                  data?.clinicalStatus?.coding?.[0]?.code?.toUpperCase() ??
                    "unknown"
                ]
              }
            >
              {data?.clinicalStatus?.coding?.[0]?.code}
            </Badge>
            <Badge ml="1" fontSize="1em" colorScheme="blue">
              {data?.verificationStatus?.coding?.[0]?.code}
            </Badge>
          </div>

          <div className="flex text-gray-600 font-semibold">
            Asserted by:
            <div className="text-black pl-4">
              {data?.recorder?.display ?? "Unknown"}
            </div>
          </div>
          <div className="flex text-gray-600 font-semibold">
            Recorded on:{" "}
            <div className="text-black pl-4">{data?.recordedDate}</div>
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

export default AllergyCard;
