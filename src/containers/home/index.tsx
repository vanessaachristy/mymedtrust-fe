import React from "react";
import FhirCard from "../../components/fhirCard";
import { observation, observation2 } from "../../data/mockData/observation";

const Home = () => {
  const fhirResource1 = JSON.parse(JSON.stringify(observation));
  const fhirResource2 = JSON.parse(JSON.stringify(observation2));
  return (
    <div>
      <FhirCard data={fhirResource1} />
      <FhirCard data={fhirResource2} />
    </div>
  );
};

export default Home;
