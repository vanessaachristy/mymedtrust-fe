import { chakra } from "@chakra-ui/react";
import { Medication } from "fhir/r4";
import { GiMedicinePills } from "react-icons/gi";

require("fhir-react/build/style.css");
require("fhir-react/build/bootstrap-reboot.min.css");
const { FhirResource, fhirVersions } = require("fhir-react");

type ConditionCardProps = {
  data: Medication;
};
const MedicationCard = ({ data }: ConditionCardProps) => {
  const CGiMedicinePills = chakra(GiMedicinePills);

  return (
    <div className="w-full">
      <FhirResource
        fhirResource={data}
        fhirVersion={fhirVersions.R4}
        fhirIcons={
          <span>
            <CGiMedicinePills color={"orange.500"} size={25} />
          </span>
        }
        withCarinBBProfile
        thorough
      />
    </div>
  );
};

export default MedicationCard;
