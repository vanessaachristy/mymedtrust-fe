import { chakra } from "@chakra-ui/react";
import { AllergyIntolerance } from "fhir/r4";
import { MdNoFood } from "react-icons/md";

require("fhir-react/build/style.css");
require("fhir-react/build/bootstrap-reboot.min.css");
const { FhirResource, fhirVersions } = require("fhir-react");

type AllergyCardProps = {
  data: AllergyIntolerance;
};
const AllergyCard = ({ data }: AllergyCardProps) => {
  const CMdNoFood = chakra(MdNoFood);

  return (
    <div>
      <FhirResource
        fhirResource={data}
        fhirVersion={fhirVersions.R4}
        fhirIcons={
          <span>
            <CMdNoFood color={"red.700"} size={25} />
          </span>
        }
        withCarinBBProfile
        thorough
      />
    </div>
  );
};

export default AllergyCard;
