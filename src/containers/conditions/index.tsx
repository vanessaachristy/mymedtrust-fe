import ConditionCard from "../../components/ConditionCard";
import { Heading, Spinner } from "@chakra-ui/react";
import { useGetConditionQuery } from "../../api/condition";
import { Condition } from "fhir/r4";
import { useUserContext } from "../../model/user/userContext";
import { useEffect } from "react";
import { renderComponent } from "../../utils/renderComponent";

const Conditions = () => {
  const { user } = useUserContext();
  const {
    data: conditionList,
    isLoading,
    isError,
    refetch: fetchConditions,
  } = useGetConditionQuery(user?.address);

  useEffect(() => {
    if (user?.address) {
      fetchConditions();
    }
  }, [user, fetchConditions]);

  return (
    <div className="flex flex-col items-center justify-start p-6 w-full">
      <Heading color="blue.500">Conditions</Heading>
      {renderComponent({
        loading: {
          isLoading: isLoading,
        },
        error: {
          isError: isError,
          onErrorRetry: fetchConditions,
        },
        component: (
          <div className="w-[90%]">
            {conditionList?.map((item: Condition) => {
              return <ConditionCard data={item} />;
            })}
          </div>
        ),
      })}
    </div>
  );
};

export default Conditions;
