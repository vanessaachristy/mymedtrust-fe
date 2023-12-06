import { Heading } from "@chakra-ui/react";
import AllergyCard from "../../components/AllergyCard";
import { allergy1 } from "../../data/mockData/allergy";

const Allergies = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Heading color="blue.500">Allergies</Heading>
      <AllergyCard data={allergy1} />
    </div>
  );
};

export default Allergies;
