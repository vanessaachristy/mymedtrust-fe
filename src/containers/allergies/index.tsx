import AllergyCard from "../../components/AllergyCard";
import { allergy1 } from "../../data/mockData/allergy";

const Allergies = () => {
  return (
    <div>
      <h1>Allergies</h1>
      <AllergyCard data={allergy1} />
    </div>
  );
};

export default Allergies;
