import { condition1 } from "../../data/mockData/condition";
import ConditionCard from "../../components/ConditionCard";

const Conditions = () => {
  return (
    <div>
      <h1>Conditions</h1>
      <ConditionCard data={condition1} />
    </div>
  );
};

export default Conditions;
