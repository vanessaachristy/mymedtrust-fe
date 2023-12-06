import { condition1 } from "../../data/mockData/condition";
import ConditionCard from "../../components/ConditionCard";
import { Heading } from "@chakra-ui/react";

const Conditions = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Heading color="blue.500">Condition</Heading>
      <ConditionCard data={condition1} />
    </div>
  );
};

export default Conditions;
