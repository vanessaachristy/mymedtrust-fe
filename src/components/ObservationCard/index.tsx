import { Observation } from "fhir/r4";

require("fhir-react/build/style.css");
require("fhir-react/build/bootstrap-reboot.min.css");
const { FhirResource, fhirVersions } = require("fhir-react");

type ObservationCardProps = {
  data: Observation;
};
const ObservationCard = ({ data }: ObservationCardProps) => {
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

export default ObservationCard;
