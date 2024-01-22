import {
  Heading,
  Stack,
  Badge,
  Icon,
  Box,
  useDisclosure,
  Collapse,
  Button,
} from "@chakra-ui/react";
import { Observation } from "fhir/r4";
import { FaHouseMedical } from "react-icons/fa6";
import { IoSadSharp, IoHappySharp } from "react-icons/io5";
import ReusableModal from "../Modal";
import { useState } from "react";
import { Slider, SliderSingleProps, Tooltip } from "antd";

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
      title={`${data?.resourceType} ${data?.code?.coding?.[0]?.display}`}
      content={<div>{JSON.stringify(data)}</div>}
      onClose={() => {
        setShowModal(false);
      }}
      isOpen={showModal}
    />
  );

  const CustomCard = (
    <div className="m-8 p-8 pt-4 flex flex-col justify-between bg-gradient-to-b  from-white to-primaryBlue-50 rounded-lg relative overflow-hidden">
      <div className="absolute bottom-0 right-0 opacity-30 text-blue-300 z-0">
        <FaHouseMedical size={"xl"} />
      </div>
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
        colorScheme="blue"
        variant="outline"
        onClick={() => setShowModal(true)}
        marginTop="8px"
      >
        {showModal ? "Close Details" : "View Details"}
      </Button>
    </div>
  );

  return <div className="w-full">{CustomCard}</div>;
};

export default ObservationCard;
