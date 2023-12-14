import { Heading } from "@chakra-ui/react";
import MedicationInputCard from "../../components/MedicationInputCard";

const AddMedication = () => {
  return (
    <div className="flex flex-col items-center justify-start p-6 w-full">
      <Heading color="blue.500">Add Medication</Heading>
      <MedicationInputCard />;
    </div>
  );
};

export default AddMedication;
