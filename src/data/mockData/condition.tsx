import { Condition } from "fhir/r4";

export const condition1: Condition = {
  resourceType: "Condition",
  id: "example",
  text: {
    status: "generated",
    div: '<div xmlns="http://www.w3.org/1999/xhtml">Severe burn of left ear (Date: 24-May 2012)</div>',
  },
  clinicalStatus: {
    coding: [
      {
        system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
        code: "active",
      },
    ],
  },
  verificationStatus: {
    coding: [
      {
        system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
        code: "confirmed",
      },
    ],
  },
  category: [
    {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/condition-category",
          code: "encounter-diagnosis",
          display: "Encounter Diagnosis",
        },
        {
          system: "http://snomed.info/sct",
          code: "439401001",
          display: "Diagnosis",
        },
      ],
    },
  ],
  severity: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "24484000",
        display: "Severe",
      },
    ],
  },
  code: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "39065001",
        display: "Burn of ear",
      },
    ],
    text: "Burnt Ear",
  },
  bodySite: [
    {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: "49521004",
          display: "Left external ear structure",
        },
      ],
      text: "Left Ear",
    },
  ],
  subject: {
    reference: "Patient/example",
  },
  onsetDateTime: "2012-05-24",
};
