import { Condition } from "fhir/r4";

require("fhir-react/build/style.css");
require("fhir-react/build/bootstrap-reboot.min.css");
const { FhirResource, fhirVersions } = require("fhir-react");

type ConditionCardProps = {
  data: Condition;
};
const ConditionCard = ({ data }: ConditionCardProps) => {
  return (
    <div>
      <FhirResource
        fhirResource={data}
        fhirVersion={fhirVersions.R4}
        fhirIcons="https://gravatar.com/avatar"
        withCarinBBProfile
        thorough
      />
    </div>
  );
};

export default ConditionCard;
