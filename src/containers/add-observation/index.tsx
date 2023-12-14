import { Heading } from "@chakra-ui/react";
import ObservationInputCard from "../../components/ObservationInputCard";
import { useUserContext } from "../../model/user/userContext";

const AddObservation = () => {
  return (
    <div className="flex flex-col items-center justify-start p-6 w-full">
      <Heading color="blue.500">Add Observation</Heading>
      <ObservationInputCard />;
    </div>
  );
};

export default AddObservation;
