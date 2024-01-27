import {
  Heading,
  Stack,
  Badge,
  Icon,
  Box,
  useDisclosure,
  Collapse,
  Button,
  StackDivider,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Image,
} from "@chakra-ui/react";
import { Observation } from "fhir/r4";
import { FaHouseMedical } from "react-icons/fa6";
import { IoSadSharp, IoHappySharp } from "react-icons/io5";
import ReusableModal from "../Modal";
import { useState } from "react";
import { Slider, SliderSingleProps, Tooltip } from "antd";
import { convertDatetimeString } from "../../utils";
import ObservationBg from "../../assets/Observation.png";

type ObservationCardProps = {
  data: Observation;
};

const ObservationCard = ({ data }: ObservationCardProps) => {
  const RangeSlider = () => {
    function generateGradient(
      currentPoint: number,
      lowPoint: number,
      highPoint: number
    ) {
      const greenColor = [15, 98, 71];
      const redColor = [237, 80, 80];
      let startPercentage: number, endPercentage: number;
      let gradient: string;
      if (currentPoint > highPoint) {
        startPercentage = (highPoint - lowPoint) / (currentPoint - lowPoint);
        endPercentage =
          1 - (currentPoint - highPoint) / (currentPoint - lowPoint);
        gradient = `linear-gradient(to right, rgba(${greenColor.join(",")},1) ${
          startPercentage * 100
        }%, rgba(${redColor.join(",")},1) ${endPercentage * 100}%)`;
      } else if (currentPoint < lowPoint) {
        startPercentage =
          (lowPoint - currentPoint) / (highPoint - currentPoint);
        endPercentage = 1 - (highPoint - lowPoint) / (highPoint - currentPoint);
        gradient = `linear-gradient(to right, rgba(${redColor.join(",")},1) ${
          startPercentage * 100
        }%, rgba(${greenColor.join(",")},1) ${endPercentage * 100}%)`;
      } else {
        return "green";
      }

      return gradient;
    }

    const value = [
      data?.valueQuantity?.value ?? 0,
      data?.referenceRange?.[0]?.low?.value ?? 0,
      data?.referenceRange?.[0]?.high?.value ?? 0,
    ].sort((a, b) => a - b);

    const marks: SliderSingleProps["marks"] = {
      [data?.referenceRange?.[0]?.low?.value ??
      0]: `${data?.referenceRange?.[0]?.low?.value}`,
      [data?.referenceRange?.[0]?.high?.value ??
      0]: `${data?.referenceRange?.[0]?.high?.value}`,
      [data?.valueQuantity?.value ?? 0]: {
        label: (
          <Tooltip
            style={{
              backgroundColor:
                (data?.valueQuantity?.value ?? 0) <=
                  (data?.referenceRange?.[0]?.high?.value ?? 100) &&
                (data?.valueQuantity?.value ?? 0) >=
                  (data?.referenceRange?.[0]?.low?.value ?? 0)
                  ? "green"
                  : "red",
            }}
            placement="top"
            open={true}
            title={
              (data?.valueQuantity?.value ?? 0) <=
                (data?.referenceRange?.[0]?.high?.value ?? 100) &&
              (data?.valueQuantity?.value ?? 0) >=
                (data?.referenceRange?.[0]?.low?.value ?? 0) ? (
                <Icon size="lg" as={IoHappySharp} />
              ) : (
                <Icon size="lg" as={IoSadSharp} />
              )
            }
          >
            {data?.valueQuantity?.value}
          </Tooltip>
        ),
      },
    };

    return (
      <div className="z-10 w-full p-4 pt-2 mt-2 pb-0 bg-white rounded-xl bg-opacity-60">
        <Slider
          tooltip={{
            open: false,
          }}
          min={
            Math.min(
              data?.valueQuantity?.value ?? 0,
              data?.referenceRange?.[0]?.low?.value ?? 0
            ) - 2
          }
          max={
            Math.max(
              data?.valueQuantity?.value ?? 0,
              data?.referenceRange?.[0]?.high?.value ?? 0
            ) + 2
          }
          range
          marks={marks}
          defaultValue={value}
          disabled
          styles={{
            track: {
              background: "transparent",
            },
            tracks: {
              background: generateGradient(
                data?.valueQuantity?.value ?? 0,
                data?.referenceRange?.[0]?.low?.value ?? 0,
                data?.referenceRange?.[0]?.high?.value ?? 0
              ),
            },
          }}
        />
      </div>
    );
  };

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
                      Effective Date & Time
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {data?.effectiveDateTime}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Issued Date & Time
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {data?.issued}
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
                      Subject
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Reference: {data?.subject?.reference}
                    </Text>
                    <Text fontSize="sm">Display: {data?.subject?.display}</Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Performer
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Reference: {data?.performer?.[0]?.reference}
                    </Text>
                    <Text fontSize="sm">
                      Display: {data?.performer?.[0]?.display}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Value Quantity
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Value: {data?.valueQuantity?.value}
                    </Text>
                    <Text fontSize="sm">Unit: {data?.valueQuantity?.unit}</Text>
                    <Text fontSize="sm">
                      System: {data?.valueQuantity?.system}
                    </Text>
                    <Text fontSize="sm">Code: {data?.valueQuantity?.code}</Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Reference Range
                    </Heading>
                    <Stack direction="row" divider={<StackDivider />}>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Low
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Value: {data?.referenceRange?.[0]?.low?.value}
                        </Text>
                        <Text fontSize="sm">
                          Unit: {data?.referenceRange?.[0]?.low?.unit}
                        </Text>
                        <Text fontSize="sm">
                          System: {data?.referenceRange?.[0]?.low?.system}
                        </Text>
                        <Text fontSize="sm">
                          Code: {data?.referenceRange?.[0]?.low?.code}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          High
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Value: {data?.referenceRange?.[0]?.high?.value}
                        </Text>
                        <Text fontSize="sm">
                          Unit: {data?.referenceRange?.[0]?.high?.unit}
                        </Text>
                        <Text fontSize="sm">
                          System: {data?.referenceRange?.[0]?.high?.system}
                        </Text>
                        <Text fontSize="sm">
                          Code: {data?.referenceRange?.[0]?.high?.code}
                        </Text>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
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
      <div className="flex justify-between w-full z-10">
        <div className="pb-4 w-[50%]">
          <Heading size="md" color="gray.500">
            {data?.code?.coding?.[0]?.display}
          </Heading>
          <Heading
            size="lg"
            color={
              (data?.valueQuantity?.value ?? 0) <=
                (data?.referenceRange?.[0]?.high?.value ?? 100) &&
              (data?.valueQuantity?.value ?? 0) >=
                (data?.referenceRange?.[0]?.low?.value ?? 0)
                ? "primaryBlue.500"
                : "red.700"
            }
            alignItems="flex-end"
            display="flex"
          >
            {data?.valueQuantity?.value} {data?.valueQuantity?.unit}
            <div className="font-semibold text-sm italic text-gray-600 pl-2">
              {(data?.valueQuantity?.value ?? 0) <=
                (data?.referenceRange?.[0]?.high?.value ?? 100) &&
              (data?.valueQuantity?.value ?? 0) >=
                (data?.referenceRange?.[0]?.low?.value ?? 0)
                ? "(in range)"
                : "(out of range)"}
            </div>
          </Heading>
        </div>
        <Stack
          direction={"column"}
          spacing={2}
          width={"50%"}
          alignItems={"flex-end"}
          fontSize={"sm"}
        >
          <Badge ml="1" fontSize="1em" colorScheme="blue">
            {data?.status}
          </Badge>
          <div className="flex text-gray-600 font-semibold">
            Issued by:{" "}
            <div className="text-black pl-4">
              {data?.performer?.[0]?.display}
            </div>
          </div>
          <div className="flex text-gray-600 font-semibold">
            Issued on: <div className="text-black pl-4">{data?.issued}</div>
          </div>
        </Stack>
      </div>
      {detailsModal}
      <RangeSlider />
      <Button
        className="z-10"
        colorScheme="blue"
        variant="outline"
        onClick={() => setShowModal(true)}
        marginTop="8px"
      >
        {showModal ? "Close Details" : "View Details"}
      </Button>
      <div className="absolute bottom-0 right-0 opacity-10 text-blue-300 z-0 w-[50%]">
        <Image src={ObservationBg} />
      </div>
    </div>
  );

  return <div className="w-full">{CustomCard}</div>;
};

export default ObservationCard;
