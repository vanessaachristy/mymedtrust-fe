import ConditionCard from "../../components/ConditionCard";
import { Heading, Spinner } from "@chakra-ui/react";
import { useGetConditionQuery } from "../../api/condition";
import { Condition } from "fhir/r4";

const Conditions = () => {
  const { data: conditionList, isLoading, isError } = useGetConditionQuery();

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Heading color="blue.500">Conditions</Heading>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        conditionList?.map((item: Condition) => {
          return <ConditionCard data={item} />;
        })
      )}
    </div>
  );
};

export default Conditions;
