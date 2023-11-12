import { Observation } from "fhir/r4";
import { DBMetadatas } from "../../types";

export const observation: Observation = {
  resourceType: "Observation",
  id: "example",
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: example</p><p><b>status</b>: final</p><p><b>category</b>: Vital Signs <span>(Details : {http://terminology.hl7.org/CodeSystem/observation-category code 'vital-signs' = 'Vital Signs', given as 'Vital Signs'})</span></p><p><b>code</b>: Body Weight <span>(Details : {LOINC code '29463-7' = 'Body weight', given as 'Body Weight'}; {LOINC code '3141-9' = 'Body weight Measured', given as 'Body weight Measured'}; {SNOMED CT code '27113001' = 'Body weight', given as 'Body weight'}; {http://acme.org/devices/clinical-codes code 'body-weight' = 'body-weight', given as 'Body Weight'})</span></p><p><b>subject</b>: <a>Patient/example</a></p><p><b>encounter</b>: <a>Encounter/example</a></p><p><b>effective</b>: 28/03/2016</p><p><b>value</b>: 185 lbs<span> (Details: UCUM code [lb_av] = 'lb_av')</span></p></div>",
  },
  status: "final",
  category: [
    {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/observation-category",
          code: "vital-signs",
          display: "Vital Signs",
        },
      ],
    },
  ],
  code: {
    coding: [
      {
        system: "http://loinc.org",
        code: "29463-7",
        display: "Body Weight",
      },
      {
        system: "http://loinc.org",
        code: "3141-9",
        display: "Body weight Measured",
      },
      {
        system: "http://snomed.info/sct",
        code: "27113001",
        display: "Body weight",
      },
      {
        system: "http://acme.org/devices/clinical-codes",
        code: "body-weight",
        display: "Body Weight",
      },
    ],
  },
  subject: {
    reference: "Patient/example",
  },
  encounter: {
    reference: "Encounter/example",
  },
  effectiveDateTime: "2016-03-28",
  valueQuantity: {
    value: 185,
    unit: "lbs",
    system: "http://unitsofmeasure.org",
    code: "[lb_av]",
  },
  referenceRange: [
    {
      low: {
        value: 100,
        unit: "lbs",
        system: "http://unitsofmeasure.org",
        code: "lbs",
      },
      high: {
        value: 150,
        unit: "lbs",
        system: "http://unitsofmeasure.org",
        code: "lbs",
      },
    },
  ],
};

export const observation2: Observation & DBMetadatas = {
  _id: "65295375ab6676fc62bff6ca",
  resourceType: "Observation",
  id: "body-height",
  meta: {
    profile: ["http://hl7.org/fhir/StructureDefinition/vitalsigns"],
  },
  contained: [],
  extension: [],
  modifierExtension: [],
  text: {
    status: "generated",
    div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="body-height"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;body-height&quot; </p><p style="margin-bottom: 0px">Profile: <a href="vitalsigns.html">Vital Signs Profile</a></p></div><p><b>status</b>: final</p><p><b>category</b>: Vital Signs <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.1.0/CodeSystem-observation-category.html">Observation Category Codes</a>#vital-signs)</span></p><p><b>code</b>: Body height <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#8302-2)</span></p><p><b>subject</b>: <a href="patient-example.html">Patient/example</a> &quot;Peter CHALMERS&quot;</p><p><b>effective</b>: 1999-07-02</p><p><b>value</b>: 66.899999999999991 in<span style="background: LightGoldenRodYellow"> (Details: UCUM code [in_i] = \'in_i\')</span></p></div>',
  },
  identifier: [],
  basedOn: [],
  partOf: [],
  status: "final",
  category: [
    {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/observation-category",
          code: "vital-signs",
          display: "Vital Signs",
        },
      ],
      text: "Vital Signs",
    },
  ],
  code: {
    coding: [
      {
        system: "http://loinc.org",
        code: "8302-2",
        display: "Body height",
      },
    ],
    text: "Body height",
  },
  subject: {
    reference: "Patient/example",
  },
  focus: [],
  effectiveDateTime: "1999-07-02",
  performer: [],
  valueQuantity: {
    value: 66.89999999999999,
    unit: "in",
    system: "http://unitsofmeasure.org",
    code: "[in_i]",
  },
  interpretation: [],
  note: [],
  referenceRange: [],
  hasMember: [],
  derivedFrom: [],
  component: [],
  timestamp: "Wed Oct 18 2023 21:59:21 GMT+0800 (GMT+08:00)",
  __v: 0,
};

export const observation3: Observation = {
  resourceType: "Observation",
  id: "f001",
  identifier: [
    {
      use: "official",
      system: "http://www.bmc.nl/zorgportal/identifiers/observations",
      value: "6323",
    },
  ],
  status: "final",
  code: {
    coding: [
      {
        system: "http://loinc.org",
        code: "15074-8",
        display: "Glucose [Moles/volume] in Blood",
      },
    ],
  },
  subject: {
    reference: "Patient/f001",
    display: "P. van de Heuvel",
  },
  effectiveDateTime: "2013-04-02T09:30:10+01:00",
  issued: "2013-04-03T15:30:10+01:00",
  performer: [
    {
      reference: "Practitioner/f005",
      display: "A. Langeveld",
    },
  ],
  valueQuantity: {
    value: 6.3,
    unit: "mmol/l",
    system: "http://unitsofmeasure.org",
    code: "mmol/L",
  },
  interpretation: [
    {
      coding: [
        {
          system:
            "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
          code: "H",
          display: "High",
        },
      ],
    },
  ],
  referenceRange: [
    {
      low: {
        value: 3.1,
        unit: "mmol/l",
        system: "http://unitsofmeasure.org",
        code: "mmol/L",
      },
      high: {
        value: 6.1,
        unit: "mmol/l",
        system: "http://unitsofmeasure.org",
        code: "mmol/L",
      },
    },
  ],
};
