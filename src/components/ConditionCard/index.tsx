import { Heading, Stack, chakra, Badge, Button, Tag } from "@chakra-ui/react";
import { Condition } from "fhir/r4";
import { FaFileMedicalAlt } from "react-icons/fa";
import { FaHouseMedical } from "react-icons/fa6";
import ReusableModal from "../Modal";
import { useState } from "react";

type ConditionCardProps = {
  data: Condition;
};
const ConditionCard = ({ data }: ConditionCardProps) => {
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
      <div className="flex  pr-8 justify-between w-full z-10">
        <div className="pb-4 w-[50%]">
          <Heading size="md" color="gray.500">
            {data?.code?.coding?.[0]?.display}
          </Heading>
          <Badge ml="1" fontSize="1em" colorScheme="blue">
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
