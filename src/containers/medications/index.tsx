import { Heading } from "@chakra-ui/react";
import MedicationCard from "../../components/MedicationCard";
import { medication1 } from "../../data/mockData/medication";

const Medications = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Heading color="blue.500">Medication</Heading>
      <MedicationCard data={medication1} />
    </div>
  );
};

export default Medications;
