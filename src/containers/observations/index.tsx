import React, { useEffect } from "react";
import ObservationCard from "../../components/ObservationCard";
import { useUserContext } from "../../model/user/userContext";
import { useGetObservationsQuery } from "../../api/observation";
import { Observation } from "fhir/r4";
import { Heading, Spinner } from "@chakra-ui/react";
import { renderComponent } from "../../utils/renderComponent";

const Observations = () => {
  const { user } = useUserContext();
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
      <Heading color="yellow.200">Observation</Heading>
      {renderComponent({
        loading: {
          isLoading: isLoading,
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
