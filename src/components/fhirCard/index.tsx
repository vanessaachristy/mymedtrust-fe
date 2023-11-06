import "fhir-react/build/style.css";
import "fhir-react/build/bootstrap-reboot.min.css";
const { FhirResource, fhirVersions } = require("fhir-react");

type FhirCardProps = {
  data: any;
};
const FhirCard = ({ data }: FhirCardProps) => {
  return (
    <div>
      <FhirResource
        fhirResource={data}
        fhirVersion={fhirVersions.R4}
        fhirIcons={false}
        withCarinBBProfile
      />
    </div>
  );
};

export default FhirCard;
