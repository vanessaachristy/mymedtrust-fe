import { chakra } from "@chakra-ui/react";
import { Condition } from "fhir/r4";
import { FaFileMedicalAlt } from "react-icons/fa";

require("fhir-react/build/style.css");
require("fhir-react/build/bootstrap-reboot.min.css");
const { FhirResource, fhirVersions } = require("fhir-react");

type ConditionCardProps = {
  data: Condition;
};
const ConditionCard = ({ data }: ConditionCardProps) => {
  const CFaFileMedicalAlt = chakra(FaFileMedicalAlt);

  return (
    <div>
      <FhirResource
        fhirResource={data}
        fhirVersion={fhirVersions.R4}
        fhirIcons={
          <span>
            <CFaFileMedicalAlt color={"green.500"} size={25} />
          </span>
        }
        withCarinBBProfile
        thorough
      />
    </div>
  );
};

export default ConditionCard;
