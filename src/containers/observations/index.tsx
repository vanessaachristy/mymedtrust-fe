import React from "react";
import ObservationCard from "../../components/ObservationCard";
import { useUserContext } from "../../model/user/userContext";
import { useGetObservationsQuery } from "../../api/observation";
import { Observation } from "fhir/r4";
import { Heading, Spinner } from "@chakra-ui/react";

const Observations = () => {
  const user = useUserContext();
  const {
    data: observationsList,
    isLoading,
    isError,
  } = useGetObservationsQuery();

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Heading color="blue.500">Observation</Heading>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        observationsList?.map((item: Observation) => {
          return <ObservationCard data={item} />;
        })
      )}
    </div>
  );
};

export default Observations;
