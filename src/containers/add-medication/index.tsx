import {
  Button,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import MedicationInputCard from "../../components/MedicationInputCard";
import { useState } from "react";
import AIParsedMedicationInputCard from "components/MedicationInputCard/AIParsedCard";

const AddMedication = () => {
  // const [currTab, setCurrTab] = useState(Tab.MANUAL);

  return (
    <div
      className="flex flex-col items-center justify-start p-6"
      style={{
        width: "calc(100vw - 290px)",
      }}
    >
      <Heading color="yellow.300" marginBottom={"20px"}>
        Add Medication
      </Heading>
      <Tabs align="center" variant="soft-rounded" colorScheme="blue">
        <TabList
          backgroundColor={"white"}
          padding={"6px"}
          borderRadius={"30px"}
          width="40%"
        >
          <Tab width="50%">Manual</Tab>
          <Tab width="50%">✨ AI-parsed </Tab>
        </TabList>
        <TabPanels>
          <TabPanel width="70vw">
            <MedicationInputCard />
          </TabPanel>
          <TabPanel width="70vw">
            <AIParsedMedicationInputCard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AddMedication;
