import { Heading } from "@chakra-ui/react";
import ObservationInputCard from "../../components/ObservationInputCard";
import { useUserContext } from "../../model/user/userContext";
import ConditionInputCard from "../../components/ConditionInputCard";

const AddCondition = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Heading color="blue.500">Add Condition</Heading>
      <ConditionInputCard />;
    </div>
  );
};

export default AddCondition;