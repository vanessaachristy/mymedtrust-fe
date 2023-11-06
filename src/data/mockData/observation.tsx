export const observation = {
  resourceType: "Observation",
  id: "blood-pressure",
  meta: {
    profile: ["http://hl7.org/fhir/StructureDefinition/vitalsigns"],
  },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: blood-pressure</p><p><b>meta</b>: </p><p><b>identifier</b>: urn:uuid:187e0c12-8dd2-67e2-99b2-bf273c878281</p><p><b>basedOn</b>: </p><p><b>status</b>: final</p><p><b>category</b>: Vital Signs <span>(Details : {http://terminology.hl7.org/CodeSystem/observation-category code 'vital-signs' = 'Vital Signs', given as 'Vital Signs'})</span></p><p><b>code</b>: Blood pressure systolic &amp; diastolic <span>(Details : {LOINC code '85354-9' = 'Blood pressure panel with all children optional', given as 'Blood pressure panel with all children optional'})</span></p><p><b>subject</b>: <a>Patient/example</a></p><p><b>effective</b>: 17/09/2012</p><p><b>performer</b>: <a>Practitioner/example</a></p><p><b>interpretation</b>: Below low normal <span>(Details : {http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation code 'L' = 'Low', given as 'low'})</span></p><p><b>bodySite</b>: Right arm <span>(Details : {SNOMED CT code '368209003' = 'Right upper arm', given as 'Right arm'})</span></p><blockquote><p><b>component</b></p><p><b>code</b>: Systolic blood pressure <span>(Details : {LOINC code '8480-6' = 'Systolic blood pressure', given as 'Systolic blood pressure'}; {SNOMED CT code '271649006' = 'Systolic blood pressure', given as 'Systolic blood pressure'}; {http://acme.org/devices/clinical-codes code 'bp-s' = 'bp-s', given as 'Systolic Blood pressure'})</span></p><p><b>value</b>: 107 mmHg<span> (Details: UCUM code mm[Hg] = 'mmHg')</span></p><p><b>interpretation</b>: Normal <span>(Details : {http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation code 'N' = 'Normal', given as 'normal'})</span></p></blockquote><blockquote><p><b>component</b></p><p><b>code</b>: Diastolic blood pressure <span>(Details : {LOINC code '8462-4' = 'Diastolic blood pressure', given as 'Diastolic blood pressure'})</span></p><p><b>value</b>: 60 mmHg<span> (Details: UCUM code mm[Hg] = 'mmHg')</span></p><p><b>interpretation</b>: Below low normal <span>(Details : {http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation code 'L' = 'Low', given as 'low'})</span></p></blockquote></div>",
  },
  identifier: [
    {
      system: "urn:ietf:rfc:3986",
      value: "urn:uuid:187e0c12-8dd2-67e2-99b2-bf273c878281",
    },
  ],
  basedOn: [
    {
      identifier: {
        system: "https://acme.org/identifiers",
        value: "1234",
      },
    },
  ],
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
        code: "85354-9",
        display: "Blood pressure panel with all children optional",
      },
    ],
    text: "Blood pressure systolic & diastolic",
  },
  subject: {
    reference: "Patient/example",
  },
  effectiveDateTime: "2012-09-17",
  performer: [
    {
      reference: "Practitioner/example",
    },
  ],
  interpretation: [
    {
      coding: [
        {
          system:
            "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
          code: "L",
          display: "low",
        },
      ],
      text: "Below low normal",
    },
  ],
  bodySite: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "368209003",
        display: "Right arm",
      },
    ],
  },
  component: [
    {
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "8480-6",
            display: "Systolic blood pressure",
          },
          {
            system: "http://snomed.info/sct",
            code: "271649006",
            display: "Systolic blood pressure",
          },
          {
            system: "http://acme.org/devices/clinical-codes",
            code: "bp-s",
            display: "Systolic Blood pressure",
          },
        ],
      },
      valueQuantity: {
        value: 107,
        unit: "mmHg",
        system: "http://unitsofmeasure.org",
        code: "mm[Hg]",
      },
      interpretation: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
              code: "N",
              display: "normal",
            },
          ],
          text: "Normal",
        },
      ],
    },
    {
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "8462-4",
            display: "Diastolic blood pressure",
          },
        ],
      },
      valueQuantity: {
        value: 60,
        unit: "mmHg",
        system: "http://unitsofmeasure.org",
        code: "mm[Hg]",
      },
      interpretation: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
              code: "L",
              display: "low",
            },
          ],
          text: "Below low normal",
        },
      ],
    },
  ],
};

export const observation2 = {
  _id: "65295375ab6676fc62bff6ca",
  resourceType: "observation",
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
  triggeredBy: [],
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
