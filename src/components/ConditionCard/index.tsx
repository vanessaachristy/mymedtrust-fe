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
import { Condition } from "fhir/r4";
import ReusableModal from "../Modal";
import { useState } from "react";
import ConditionBg from "../../assets/Condition.png";
import { severityDisplay } from "../../constants/record";

type ConditionCardProps = {
  data: Condition;
};
const ConditionCard = ({ data }: ConditionCardProps) => {
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
                        Clinical Status
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        System: {data?.clinicalStatus?.coding?.[0]?.system}
                      </Text>
                      <Text fontSize="sm">
                        Code: {data?.clinicalStatus?.coding?.[0]?.code}
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
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Category
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        System: {data?.category?.[0]?.coding?.[0]?.system}
                      </Text>
                      <Text fontSize="sm">
                        Code: {data?.category?.[0]?.coding?.[0]?.code}
                      </Text>
                      <Text fontSize="sm">
                        Display: {data?.category?.[0]?.coding?.[0]?.display}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Body Site
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        System: {data?.bodySite?.[0]?.coding?.[0]?.system}
                      </Text>
                      <Text fontSize="sm">
                        Code: {data?.bodySite?.[0]?.coding?.[0]?.code}
                      </Text>
                      <Text fontSize="sm">
                        Display: {data?.bodySite?.[0]?.coding?.[0]?.display}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Onset Date & Time
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {data?.onsetDateTime}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Abatement Date & Time
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {data?.abatementDateTime}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Recorded Date & Time
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {data?.recordedDate}
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
                      <Heading size="xs" textTransform="uppercase">
                        Asserter
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        Reference: {data?.asserter?.reference}
                      </Text>
                      <Text fontSize="sm">
                        Display: {data?.asserter?.display}
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
      <div className="absolute -bottom-[200px] right-0 opacity-20 text-blue-300 z-0 w-[50%]">
        <Image src={ConditionBg} />
      </div>
      <div className="flex  pr-8 justify-between w-full z-10">
        <div className="pb-4 w-[50%]">
          <Heading size="md" color="gray.500">
            {data?.code?.coding?.[0]?.display}
          </Heading>
          <Badge
            fontSize="1em"
            colorScheme={
              severityDisplay[
                data?.severity?.coding?.[0]?.display?.toUpperCase() ?? "UNKNOWN"
              ]
            }
          >
            {data?.severity?.coding?.[0]?.display}{" "}
          </Badge>
        </div>
        <Stack
          direction={"column"}
          spacing={1}
          width={"50%"}
          alignItems={"flex-end"}
          fontSize={"sm"}
        >
          <Badge fontSize="1em" colorScheme="blue">
            {data?.clinicalStatus?.coding?.[0]?.code}
          </Badge>
          <div className="flex text-gray-600 font-semibold">
            Asserted by:
            <div className="text-black pl-4">
              {data?.asserter?.display ?? "Unknown"}
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

export default ConditionCard;
