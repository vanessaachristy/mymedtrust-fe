import { Heading } from "@chakra-ui/react";
import AllergyInputCard from "../../components/AllergyInputCard";

const AddAllergy = () => {
  return (
    <div
      className="flex flex-col items-center justify-start p-6"
      style={{
        width: "calc(100vw - 290px)",
      }}
    >
      <Heading color="yellow.300" marginBottom={"20px"}>
        Add Allergy
      </Heading>
      <AllergyInputCard />;
    </div>
  );
};

export default AddAllergy;
