import React, { useEffect } from "react";
import ObservationCard from "../../components/ObservationCard";
import { useUserContext } from "../../model/user/userContext";
import { useGetObservationsQuery } from "../../api/observation";
import { Observation } from "fhir/r4";
import { Heading, Skeleton, Spinner, Stack } from "@chakra-ui/react";
import { renderComponent } from "../../utils/renderComponent";
import { useFetchUserDetailQuery } from "../../api/user";

const Observations = () => {
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
    data: observationsList,
    isLoading,
    isError,
    refetch: fetchObservations,
  } = useGetObservationsQuery(user?.address);

  useEffect(() => {
    if (user?.address) {
      fetchObservations();
    }
  }, [user, fetchObservations]);
  return (
    <div className="flex flex-col items-center justify-start p-6 w-full">
      <Heading color="yellow.200" marginBottom={8}>
        Observation
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
          onErrorRetry: fetchObservations,
        },
        component: (
          <div className="w-[90%]">
            {observationsList?.map((item: Observation) => {
              return <ObservationCard data={item} />;
            })}
          </div>
        ),
      })}
    </div>
  );
};

export default Observations;
