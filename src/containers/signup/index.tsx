import React, { useState } from "react";
import {
  FormControl,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  chakra,
  Link,
  Stack,
  FormLabel,
  RadioGroup,
  Radio,
  HStack,
  InputLeftAddon,
  Select,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";
import {
  FaUserAlt,
  FaLock,
  FaLink,
  FaCalendar,
  FaHome,
  FaIdCard,
  FaEnvelope,
  FaHospitalSymbol,
  FaUserGraduate,
  FaUserMd,
  FaWeight,
} from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import { BloodType, UserType } from "../../constants/user";
import { PATH } from "../../constants/path";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaLink = chakra(FaLink);
const CFaCalendar = chakra(FaCalendar);
const CFaHome = chakra(FaHome);
const CFaIdCard = chakra(FaIdCard);
const CFaEnvelope = chakra(FaEnvelope);
const CFaHospital = chakra(FaHospitalSymbol);
const CFaUserMd = chakra(FaUserMd);
const CFaUserGraduate = chakra(FaUserGraduate);
const CFaWeight = chakra(FaWeight);
const CGiBodyHeight = chakra(GiBodyHeight);

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userType, setUserType] = useState(UserType.PATIENT);

  const onUserTypeChange = (val: string) => {
    setUserType(val as UserType);
  };

  const [patientFormData, setPatientFormData] = useState({
    emergencyContact: "",
    emergencyNumber: "",
    bloodType: "",
    height: "",
    weight: "",
  });
  const [doctorFormData, setDoctorFormData] = useState({
    hospital: "",
    qualification: "",
    major: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactAddress: "",
    IC: "",
    phone: "",
    birthdate: "",
    gender: "",
    address: "",
    city: "",
    zipcode: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePatientInputChange = (e: any) => {
    const { name, value } = e.target;
    setPatientFormData({
      ...patientFormData,
      [name]: value,
    });
  };

  const handleDoctorInputChange = (e: any) => {
    const { name, value } = e.target;
    setDoctorFormData({
      ...doctorFormData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // You can handle form submission logic here, such as sending the data to a server or performing client-side validation.
    console.log(
      "Form submitted with data:",
      formData,
      patientFormData,
      doctorFormData
    );
  };

  const [passwordError, setPasswordError] = useState("");

  const handleConfirmPasswordChange = (e: any) => {
    const { value } = e.target;
    console.log(value === formData.password);
    if (value !== formData.password) {
      setPasswordError("Passwords do not match!");
    } else {
      setPasswordError("");
    }
  };

  let patientForm = (
    <>
      <Stack spacing={2} paddingBottom={"6px"}>
        <FormLabel as="legend">Emergency Contact</FormLabel>
        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CFaUserAlt color="gray.300" />}
            />
            <Input
              type="name"
              placeholder="Emergency Contact Name"
              name="emergencyContact"
              value={patientFormData.emergencyContact}
              onChange={handlePatientInputChange}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon children={"+65"} />
            <Input
              type="tel"
              placeholder="Phone Number"
              name="emergencyNumber"
              value={patientFormData.emergencyNumber}
              onChange={handlePatientInputChange}
            />
          </InputGroup>
        </FormControl>
      </Stack>
      <FormControl>
        <Select
          placeholder="Blood Type"
          name="bloodType"
          value={patientFormData.bloodType}
          onChange={handlePatientInputChange}
        >
          <option value={BloodType.A}>A</option>
          <option value={BloodType.B}>B</option>
          <option value={BloodType.AB}>AB</option>
          <option value={BloodType.O}>O</option>
        </Select>
      </FormControl>
      <FormControl>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<CGiBodyHeight color="gray.300" />}
          />
          <Input
            type="number"
            placeholder="Height"
            name="height"
            value={patientFormData.height}
            onChange={handlePatientInputChange}
          />
          <InputRightElement pointerEvents="none" children={"cm"} />
        </InputGroup>
      </FormControl>
      <FormControl>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<CFaWeight color="gray.300" />}
          />
          <Input
            type="number"
            placeholder="Weight"
            name="weight"
            value={patientFormData.weight}
            onChange={handlePatientInputChange}
          />
          <InputRightElement pointerEvents="none" children={"kg"} />
        </InputGroup>
      </FormControl>
    </>
  );
  let doctorForm = (
    <>
      <FormControl>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<CFaHospital color="gray.300" />}
          />
          <Input
            htmlSize={6}
            type="text"
            placeholder="Hospital/Organization"
            name="hospital"
            value={doctorFormData.hospital}
            onChange={handleDoctorInputChange}
          />
        </InputGroup>
      </FormControl>
      <FormControl>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<CFaUserMd color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Qualification"
            name="bloodType"
            value={doctorFormData.qualification}
            onChange={handleDoctorInputChange}
          />
        </InputGroup>
      </FormControl>
      <FormControl>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<CFaUserGraduate color="gray.300" />}
          />
          <Input
            htmlSize={6}
            type="text"
            placeholder="Major"
            name="major"
            value={doctorFormData.major}
            onChange={handleDoctorInputChange}
          />
        </InputGroup>
      </FormControl>
    </>
  );

  return (
    <div className="flex justify-center items-center">
      <div className="w-[60vw] h-auto flex flex-col justify-center items-center px-12 space-y-12">
        <div className="w-full text-cyan-800 font-semibold text-2xl">
          MyMedtrace
        </div>
        <div className="h-[80%] flex flex-col justify-center items-center w-full">
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={6}
              padding={"12px"}
              backgroundColor={"whiteAlpha.100"}
              width={"100%"}
              textAlign={"left"}
            >
              <h3>Start storing your health record securely!</h3>
              <div>
                Already have an account?{" "}
                <Link color="blue.400" href={PATH.Login}>
                  Login
                </Link>
              </div>

              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="name"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaEnvelope color="gray.300" />}
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired isInvalid={passwordError !== ""}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={handleConfirmPasswordChange}
                  />

                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaLink color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Contract Address"
                    name="contactAddress"
                    value={formData.contactAddress}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaIdCard color="gray.300" />}
                  />
                  <Input type="text" placeholder="IC" />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel as="legend">Gender</FormLabel>
                <RadioGroup defaultValue="Male">
                  <HStack spacing="24px">
                    <Radio
                      value="Male"
                      name="gender"
                      onChange={handleInputChange}
                    >
                      Male
                    </Radio>
                    <Radio
                      value="Female"
                      name="gender"
                      onChange={handleInputChange}
                    >
                      Female
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftAddon children={"+65"} />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel as="legend">Date of Birth</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaCalendar color="gray.300" />}
                  />
                  <Input
                    type="date"
                    placeholder="Date of Birth"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
              <Stack spacing={2}>
                <FormLabel as="legend">Home Address</FormLabel>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaHome color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormControl>{" "}
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaHome color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormControl>{" "}
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaHome color="gray.300" />}
                    />
                    <Input
                      htmlSize={6}
                      type="text"
                      placeholder="Zip Code"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
              <FormControl isRequired>
                <FormLabel as="legend">User Type</FormLabel>
                <RadioGroup
                  defaultValue="patient"
                  onChange={(val) => onUserTypeChange(val)}
                >
                  <HStack spacing="24px">
                    <Radio value="patient">Patient</Radio>
                    <Radio value="doctor">Doctor</Radio>
                    <Radio value="admin">Admin</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>

              {userType === UserType.DOCTOR && doctorForm}
              {userType === UserType.PATIENT && patientForm}

              <Button
                borderRadius={12}
                type="submit"
                colorScheme="blue"
                width="full"
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
