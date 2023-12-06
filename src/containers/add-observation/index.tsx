import { Heading } from "@chakra-ui/react";
import ObservationInputCard from "../../components/ObservationInputCard";
import { useUserContext } from "../../model/user/userContext";

const AddObservation = () => {
  return (
    <>
      <Heading size="lg" textTransform="uppercase">
        Add new observation
      </Heading>
      <ObservationInputCard />;
    </>
  );
};

export default AddObservation;