import { Heading } from "@chakra-ui/react";
import ObservationInputCard from "../../components/ObservationInputCard";
import { useUserContext } from "../../model/user/userContext";

const AddObservation = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Heading color="blue.500">Add Observation</Heading>
      <ObservationInputCard />;
    </div>
  );
};

export default AddObservation;
