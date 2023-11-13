import React from "react";
import {
  observation,
  observation2,
  observation3,
} from "../../data/mockData/observation";
import { condition1 } from "../../data/mockData/condition";
import ObservationCard from "../../components/ObservationCard";
import ConditionCard from "../../components/ConditionCard";
import AllergyCard from "../../components/AllergyCard";
import { allergy1 } from "../../data/mockData/allergy";
import { useUserContext } from "../../model/user/userContext";
import { useSelector } from "react-redux";
import { selectUser } from "../../model/selector";
import { useGetObservationsQuery } from "../../api/observation";
import { Observation } from "fhir/r4";

const Observations = () => {
  const user = useUserContext();

  const {
    data: observationsList,
    isLoading,
    isError,
  } = useGetObservationsQuery();
  console.log(observationsList);

  return (
    <div>
      <h1>Observations</h1>
      <ObservationCard data={observation} />
      <ObservationCard data={observation2} />
      <ObservationCard data={observation3} />
      {observationsList?.map((item: Observation) => {
        return <ObservationCard data={item} />;
      })}
    </div>
  );
};

export default Observations;
