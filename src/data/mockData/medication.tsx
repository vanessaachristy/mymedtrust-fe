import { Medication } from "fhir/r4";

export const medication1: Medication = {
  resourceType: "Medication",
  id: "medexample015",
  contained: [
    {
      resourceType: "Organization",
      id: "org2",
      name: "Gene Inc",
    },
    {
      resourceType: "Substance",
      id: "sub04",
      code: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "386906001",
            display: "Capecitabine (substance)",
          },
        ],
      },
    },
  ],
  code: {
    coding: [
      {
        system: "http://www.nlm.nih.gov/research/umls/rxnorm",
        code: "213293",
        display: "Capecitabine 500mg oral tablet (Xeloda)",
      },
    ],
  },
  manufacturer: {
    reference: "Organization/org2",
    display: "Gene Inc",
  },
  form: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "385055001",
        display: "Tablet dose form (qualifier value)",
      },
    ],
  },
  ingredient: [
    {
      itemReference: {
        reference: "Substance/sub04",
        display: "Capecitabine (substance)",
      },
      strength: {
        numerator: {
          value: 500,
          system: "http://unitsofmeasure.org",
          code: "mg",
        },
        denominator: {
          value: 1,
          system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
          code: "TAB",
        },
      },
    },
  ],
  batch: {
    lotNumber: "9494788",
    expirationDate: "2017-05-22",
  },
};
