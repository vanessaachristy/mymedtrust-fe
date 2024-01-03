import { Heading } from "@chakra-ui/react";
import MedicationInputCard from "../../components/MedicationInputCard";

const AddMedication = () => {
  return (
    <div
      className="flex flex-col items-center justify-start p-6"
      style={{
        width: "calc(100vw - 290px)",
      }}
    >
      <Heading color="yellow.300" marginBottom={"20px"}>
        Add Medication
      </Heading>
      <MedicationInputCard />;
    </div>
  );
};

export default AddMedication;
