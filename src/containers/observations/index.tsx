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

const Observations = () => {
  return (
    <div>
      <h1>Observations</h1>
      <ObservationCard data={observation} />
      <ObservationCard data={observation2} />
      <ObservationCard data={observation3} />
    </div>
  );
};

export default Observations;
