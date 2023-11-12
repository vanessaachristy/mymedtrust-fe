import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Observation } from "fhir/r4";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";

const ObservationInputCard = () => {
  const [formData, setFormData] = useState<Observation>({
    resourceType: "Observation",
    status: "unknown",
    code: {
      coding: [
        {
          system: "",
          code: "",
          display: "",
        },
      ],
    },
    subject: {
      reference: "",
      display: "",
    },
    effectiveDateTime: new Date().toDateString(),
    issued: new Date().toDateString(),
    performer: [
      {
        reference: "Practitioner/ID",
        display: "Account Name",
      },
    ],
    valueQuantity: {
      value: 0,
      unit: "",
      system: "http://unitsofmeasure.org",
      code: "",
    },
    interpretation: [],
    referenceRange: [
      {
        low: {
          value: 0,
          unit: "",
          system: "http://unitsofmeasure.org",
          code: "",
        },
        high: {
          value: 0,
          unit: "",
          system: "http://unitsofmeasure.org",
          code: "",
        },
      },
    ],
  });

  const ResourceType = (
    <FormControl isRequired>
      <Card>
        <CardHeader>
          <FormLabel size="sm" textTransform={"uppercase"} fontWeight={700}>
            Resource Type
          </FormLabel>
        </CardHeader>
        <CardBody>
          <InputGroup>
            <Input
              type="text"
              placeholder="Observation"
              name="resourceType"
              value={formData.resourceType}
              disabled
            />
          </InputGroup>
        </CardBody>
      </Card>
    </FormControl>
  );

  const enum ObservationStatus {
    REGISTERED = "registered",
    PRELIMINARY = "preliminary",
    FINAL = "final",
    AMENDED = "amended",
    CORRECTED = "corrected",
    CANCELLED = "cancelled",
    ENTERED_IN_ERROR = "entered-in-error",
    UNKNOWN = "unknown",
  }

  const Status = (
    <FormControl isRequired>
      <Card>
        <CardHeader>
          <FormLabel size="sm" textTransform={"uppercase"} fontWeight={700}>
            Status
          </FormLabel>
        </CardHeader>
        <CardBody>
          <Select
            placeholder="Status"
            name="status"
            value={formData.status}
            onChange={(e) => {
              const { value } = e.target;
              setFormData({
                ...formData,
                status: value as ObservationStatus,
              });
            }}
          >
            <option value={ObservationStatus.AMENDED}>
              {ObservationStatus.AMENDED}
            </option>
            <option value={ObservationStatus.CANCELLED}>
              {ObservationStatus.CANCELLED}
            </option>
            <option value={ObservationStatus.CORRECTED}>
              {ObservationStatus.CORRECTED}
            </option>
            <option value={ObservationStatus.ENTERED_IN_ERROR}>
              {ObservationStatus.ENTERED_IN_ERROR}
            </option>
            <option value={ObservationStatus.FINAL}>
              {ObservationStatus.FINAL}
            </option>
            <option value={ObservationStatus.PRELIMINARY}>
              {ObservationStatus.PRELIMINARY}
            </option>
            <option value={ObservationStatus.REGISTERED}>
              {ObservationStatus.REGISTERED}
            </option>
            <option value={ObservationStatus.UNKNOWN}>
              {ObservationStatus.UNKNOWN}
            </option>
          </Select>
        </CardBody>
      </Card>
    </FormControl>
  );

  const Code = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Code
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"row"} spacing={4}>
          <FormControl isRequired>
            <FormLabel>System</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="System"
                name="system"
                value={formData?.code?.coding?.[0].system}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.code?.coding?.[0];
                  setFormData({
                    ...formData,
                    code: {
                      coding: [
                        {
                          ...coding,
                          system: value,
                        },
                      ],
                    },
                  });
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Code</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Code"
                name="code"
                value={formData?.code?.coding?.[0].code}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.code?.coding?.[0];
                  setFormData({
                    ...formData,
                    code: {
                      coding: [
                        {
                          ...coding,
                          code: value,
                        },
                      ],
                    },
                  });
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Display</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Display"
                name="display"
                value={formData?.code?.coding?.[0].display}
                onChange={(e) => {
                  const { value } = e.target;
                  const coding = formData?.code?.coding?.[0];
                  setFormData({
                    ...formData,
                    code: {
                      coding: [
                        {
                          ...coding,
                          display: value,
                        },
                      ],
                    },
                  });
                }}
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const Subject = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Subject
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"row"} spacing={4}>
          <FormControl>
            <FormLabel>Reference</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Reference"
                name="reference"
                value={formData?.subject?.reference}
                onChange={(e) => {
                  const { value } = e.target;
                  const subject = formData?.subject;
                  setFormData({
                    ...formData,
                    subject: {
                      ...subject,
                      reference: value,
                    },
                  });
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Display</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Display"
                name="display"
                value={formData?.subject?.display}
                onChange={(e) => {
                  const { value } = e.target;
                  const subject = formData?.subject;
                  setFormData({
                    ...formData,
                    subject: {
                      ...subject,
                      display: value,
                    },
                  });
                }}
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const Performer = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Performer
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"row"} spacing={4}>
          <FormControl>
            <FormLabel>Reference</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Reference"
                name="reference"
                value={formData?.performer?.[0].reference}
                disabled
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Display</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Display"
                name="display"
                value={formData?.performer?.[0].display}
                disabled
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const ValueQuantity = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Value Quantity
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"row"} spacing={4}>
          <FormControl isRequired>
            <FormLabel>Value</FormLabel>
            <InputGroup>
              <NumberInput
                defaultValue={formData?.valueQuantity?.value}
                min={0}
                name="value"
                placeholder="Value"
                width={"100%"}
                onChange={(val) => {
                  const valueQuantity = formData?.valueQuantity;
                  setFormData({
                    ...formData,
                    valueQuantity: {
                      ...valueQuantity,
                      value: Number(val),
                    },
                  });
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Unit</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Unit"
                name="unit"
                value={formData?.valueQuantity?.unit}
                onChange={(e) => {
                  const { value } = e.target;
                  const valueQuantity = formData?.valueQuantity;
                  setFormData({
                    ...formData,
                    referenceRange: [
                      {
                        ...formData?.referenceRange?.[0],
                        low: {
                          ...formData?.referenceRange?.[0].low,
                          unit: value,
                        },
                        high: {
                          ...formData?.referenceRange?.[0].high,
                          unit: value,
                        },
                      },
                    ],
                    valueQuantity: {
                      ...valueQuantity,
                      unit: value,
                    },
                  });
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Code</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Code"
                name="code"
                value={formData?.valueQuantity?.code}
                onChange={(e) => {
                  const { value } = e.target;
                  const valueQuantity = formData?.valueQuantity;
                  setFormData({
                    ...formData,
                    referenceRange: [
                      {
                        ...formData?.referenceRange?.[0],
                        low: {
                          ...formData?.referenceRange?.[0].low,
                          code: value,
                        },
                        high: {
                          ...formData?.referenceRange?.[0].high,
                          code: value,
                        },
                      },
                    ],
                    valueQuantity: {
                      ...valueQuantity,
                      code: value,
                    },
                  });
                }}
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );

  const ReferenceRange = (
    <Card>
      <CardHeader>
        <Heading size="sm" textTransform={"uppercase"}>
          Reference Range
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"column"} spacing={4} divider={<StackDivider />}>
          <div>
            <Heading size="xs" textTransform={"uppercase"}>
              Low
            </Heading>
            <Stack direction={"row"} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Value</FormLabel>
                <InputGroup>
                  <NumberInput
                    defaultValue={formData?.referenceRange?.[0]?.low?.value}
                    min={0}
                    name="value"
                    placeholder="Value"
                    width={"100%"}
                    onChange={(val) => {
                      const low = formData?.referenceRange?.[0]?.low;
                      setFormData({
                        ...formData,
                        referenceRange: [
                          {
                            ...formData?.referenceRange?.[0],
                            low: {
                              ...low,
                              value: Number(val),
                            },
                          },
                        ],
                      });
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Unit</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Unit"
                    name="unit"
                    value={formData?.valueQuantity?.unit}
                    disabled
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Display</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Code"
                    name="code"
                    value={formData?.valueQuantity?.code}
                    disabled
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </div>
          <div>
            <Heading size="xs" textTransform={"uppercase"}>
              High
            </Heading>
            <Stack direction={"row"} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Value</FormLabel>
                <InputGroup>
                  <NumberInput
                    defaultValue={formData?.referenceRange?.[0]?.high?.value}
                    min={0}
                    name="value"
                    placeholder="Value"
                    width={"100%"}
                    onChange={(val) => {
                      const high = formData?.referenceRange?.[0]?.high;
                      setFormData({
                        ...formData,
                        referenceRange: [
                          {
                            ...formData?.referenceRange?.[0],
                            high: {
                              ...high,
                              value: Number(val),
                            },
                          },
                        ],
                      });
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Unit</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Unit"
                    name="unit"
                    value={formData?.valueQuantity?.unit}
                    disabled
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Display</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Code"
                    name="code"
                    value={formData?.valueQuantity?.code}
                    disabled
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </div>
        </Stack>
      </CardBody>
    </Card>
  );

  const handleSubmitForm = () => {
    console.log(JSON.stringify(formData));
  };

  return (
    <div>
      <Form onSubmit={handleSubmitForm} className="w-full">
        <Stack
          spacing={4}
          padding={"12px"}
          backgroundColor={"whiteAlpha.100"}
          width={"100%"}
          textAlign={"left"}
        >
          {ResourceType}
          {Status}
          {Code}
          {Subject}
          {Performer}
          {ValueQuantity}
          {ReferenceRange}
        </Stack>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default ObservationInputCard;
