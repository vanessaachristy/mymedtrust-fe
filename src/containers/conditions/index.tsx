import ConditionCard from "../../components/ConditionCard";
import { Heading, Skeleton, Spinner, Stack } from "@chakra-ui/react";
import { useGetConditionQuery } from "../../api/condition";
import { Condition } from "fhir/r4";
import { useUserContext } from "../../model/user/userContext";
import { useEffect } from "react";
import { renderComponent } from "../../utils/renderComponent";
import { useFetchUserDetailQuery } from "../../api/user";

const Conditions = () => {
  const { user, setUser } = useUserContext();
  const { data: userData, refetch: fetchUserData } = useFetchUserDetailQuery();
  useEffect(() => {
    if (!user.name && !user.IC && user.isLoggedIn) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

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
      <Heading color="yellow.200" marginBottom={8}>
        Conditions
      </Heading>
      {renderComponent({
        loading: {
          isLoading: isLoading,
          style: {
            width: "80%",
          },
          component: (
            <Stack width={"100%"} spacing={4}>
              <Skeleton height="240px" />
              <Skeleton height="240px" />
              <Skeleton height="240px" />
            </Stack>
          ),
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
