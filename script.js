const axios = require("axios");
const fs = require("fs");

const request = {
  credential: {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1",
    ],
    type: ["VerifiableCredential", "UniversityDegreeCredential"],
    issuer: "did:ulp:2010a34d-4292-4c1c-83ae-e7559a90931c",
    issuanceDate: "2023-02-06T11:56:27.259Z",
    expirationDate: "2023-02-08T11:56:27.259Z",
    credentialSubject: {
      id: "did:ulp:977ba77a-a549-4f3f-8d8c-eef01fe616a2",
      grade: "6.23",
      programme: "BCA",
      certifyingInstitute: "IIIT Sonepat",
      evaluatingInstitute: "NIT Kurukshetra",
    },
    options: {
      created: "2020-04-02T18:48:36Z",
      credentialStatus: {
        type: "RevocationList2020Status",
      },
    },
  },
  credentialSchema: {
    id: "did:ulpschema:c9cc0f03-4f94-4f44-9bcd-b24a86596fa2",
    type: "https://w3c-ccg.github.io/vc-json-schemas/",
    version: "1.0",
    name: "Proof of Academic Evaluation Credential",
    author: "did:example:c276e12ec21ebfeb1f712ebc6f1",
    authored: "2022-12-19T09:22:23.064Z",
    schema: {
      $id: "Proof-of-Academic-Evaluation-Credential-1.0",
      type: "object",
      $schema: "https://json-schema.org/draft/2019-09/schema",
      required: [
        "grade",
        "programme",
        "certifyingInstitute",
        "evaluatingInstitute",
      ],
      properties: {
        grade: {
          type: "string",
          description: "Grade (%age, GPA, etc.) secured by the holder.",
        },
        programme: {
          type: "string",
          description: "Name of the programme pursed by the holder.",
        },
        certifyingInstitute: {
          type: "string",
          description:
            "Name of the instute which certified the said grade in the said skill",
        },
        evaluatingInstitute: {
          type: "string",
          description:
            "Name of the institute which ran the programme and evaluated the holder.",
        },
      },
      description:
        "The holder has secured the <PERCENTAGE/GRADE> in <PROGRAMME> from <ABC_Institute>.",
      additionalProperties: false,
    },
  },
};

// const arr = Array(120).fill(
//   axios
//     .post("http://localhost:3333/credentials/issue", request)
//     .then((res) => res.data)
// );

// console.log(arr);
const sendReq = async () => {
  console.time("issue");

  const res = await Promise.all(
    Array(120).fill(
      axios.post("http://64.227.185.154:3002/credentials/issue", request)
    )
  ).then((res) => {
    console.timeEnd("issue");
    return res.map((item) => item.data);
  });

  fs.writeFileSync(`./res-${Date.now()}.json`, JSON.stringify(res), "utf-8");
  // console.log("res: ", res);
  console.log("res.length: ", res.length);
};
sendReq();
// (async () => {
//   console.time("fn");
//   await sendReq();
//   console.timeEnd("fn");
// })();
// const test = async () => await Promise.all(Array(120).fill(sendReq()));
// test();
