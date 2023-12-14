import { Heading } from "@chakra-ui/react";
import AllergyInputCard from "../../components/AllergyInputCard";

const AddAllergy = () => {
  return (
    <div className="flex flex-col items-center justify-start p-6 w-full">
      <Heading color="blue.500">Add Allergy</Heading>
      <AllergyInputCard />;
    </div>
  );
};

export default AddAllergy;
