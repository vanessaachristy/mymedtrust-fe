import { chakra } from "@chakra-ui/react";
import { Observation } from "fhir/r4";
import { PiFileMagnifyingGlass } from "react-icons/pi";

require("fhir-react/build/style.css");
require("fhir-react/build/bootstrap-reboot.min.css");
const { FhirResource, fhirVersions } = require("fhir-react");

type ObservationCardProps = {
  data: Observation;
};
const ObservationCard = ({ data }: ObservationCardProps) => {
  const CPiMagnifying = chakra(PiFileMagnifyingGlass);

  return (
    <div>
      <FhirResource
        fhirResource={data}
        fhirVersion={fhirVersions.R4}
        fhirIcons={
          <span>
            <CPiMagnifying color={"purple.400"} size={25} />
          </span>
        }
        withCarinBBProfile
        thorough
      />
    </div>
  );
};

export default ObservationCard;
