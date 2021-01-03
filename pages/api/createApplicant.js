/* 
createApplicant.js: used to create a new applicant record in the base. 
Can be tested by placing a POST request with Postman and making the JSON body the required fields
*/

import { applicationTable } from "./utils/Airtable";

export default async function handler(req, res) {
  const { email } = req.body;
  try {
    const createdRecords = await applicationTable.create([
      { fields: { email } },
    ]);
    const createdRecord = {
      fields: createdRecords[0].fields,
    };
    res.statusCode = 200;
    res.json(createdRecord);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: err });
  }
}
