import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Img,
  Stack,
} from "@chakra-ui/react";
import { TypeAnimation } from "react-type-animation";
import IsometricMedicine from "../../assets/IsometricMedicine.png";
import Blockchain from "../../assets/Blockchain.png";
import Interoperable from "../../assets/Interoperable.png";
import PatientCentric from "../../assets/PatientCentric.png";
import MyMedtraceLogo from "../../assets/MymedtraceLogo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FlippingCard from "./flipping-card";
import { PATH } from "constants/path";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <Container
      minW="100vw"
      height={"auto"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      bgGradient={"linear(to-r, black, primaryBlue.300)"}
      color="white"
      padding={0}
    >
      <Box
        backgroundColor={"blackAlpha.300"}
        padding={6}
        height="10vh"
        width={"full"}
      >
        <Img src={MyMedtraceLogo} width="15%" />
      </Box>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={12}
        height="90vh"
      >
        <Stack direction="column" spacing={4}>
          <Heading size="2xl">The Next Generation</Heading>
          <TypeAnimation
            className=" font-bold text-5xl w-fit bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-primaryBlue-100"
            sequence={[
              "SECURE",
              700,
              "INTEROPERABLE",
              700,
              "PATIENT-CENTRIC",
              700,
            ]}
            repeat={Infinity}
          />
          <Heading size="2xl">Medical Record System</Heading>
          <Button
            color="white"
            rounded={"lg"}
            bgGradient="linear(to-r, purple.400, primaryBlue.100)"
            width="50%"
            onClick={() => {
              navigate(PATH.Login);
            }}
            _hover={{
              bgGradient: "linear(to-r, purple.500, primaryBlue.200)",
              transform: "scale(1.1)",
            }}
          >
            Get Started
          </Button>
        </Stack>
        <Img
          className=" animate-upDown"
          src={IsometricMedicine}
          width={"50%"}
        />
      </Stack>
      <Stack
        direction="column"
        justifyContent={"center"}
        padding={12}
        height="100vh"
        alignItems={"center"}
      >
        <Heading className="font-bold text-5xl w-fit bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-primaryBlue-100 pb-12 text-center">
          Smart Health, Smarter Records
        </Heading>
        <Stack
          direction="row"
          justifyContent="space-around"
          height="70%"
          width="70%"
        >
          <FlippingCard
            frontContent={
              <div className="flex flex-col h-full pt-12 justify-start items-center space-y-4">
                <Heading size="md">Secure Storage</Heading>

                <Image src={Blockchain} width={"90%"} />
              </div>
            }
            backContent={
              <div className="flex flex-col justify-center text-center h-full">
                Powered by blockchain for ultimate security: Decentralized
                encryption, tamper-proof records, and controlled access ensure
                data integrity and patient confidentiality{" "}
              </div>
            }
          />
          <FlippingCard
            frontContent={
              <div className="flex flex-col h-full pt-12 justify-start items-center space-y-4">
                <Heading size="md">Interoperable System</Heading>
                <Image src={Interoperable} width={"100%"} />
              </div>
            }
            backContent={
              <div className="flex flex-col justify-center text-center h-full">
                Our EHR system ensures seamless interoperability by leveraging
                standardized FHIR data, facilitating efficient communication and
                exchange of health information across diverse healthcare
                platforms.
              </div>
            }
          />
          <FlippingCard
            frontContent={
              <div className="flex flex-col h-full pt-12 justify-start items-center space-y-4">
                <Heading size="md">Patient-Centric</Heading>
                <Image src={PatientCentric} width="100%" />
              </div>
            }
            backContent={
              <div className="flex flex-col justify-center text-center h-full">
                Our EHR system prioritizes patients with a user-centric
                approach, delivering personalized care through intuitive
                interfaces and tailored health information accessibility
              </div>
            }
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Intro;
