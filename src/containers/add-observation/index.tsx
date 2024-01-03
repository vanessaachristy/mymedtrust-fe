import { Heading } from "@chakra-ui/react";
import ObservationInputCard from "../../components/ObservationInputCard";
import { useUserContext } from "../../model/user/userContext";

const AddObservation = () => {
  return (
    <div
      className="flex flex-col items-center justify-start p-6"
      style={{
        width: "calc(100vw - 290px)",
      }}
    >
      <Heading color="yellow.300" marginBottom={"20px"}>
        Add Observation
      </Heading>
      <ObservationInputCard />;
    </div>
  );
};

export default AddObservation;
