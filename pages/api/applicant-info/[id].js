import {
  applicationTable,
  getMinifiedApplicantRecord,
} from "../utils/Airtable";

// API function to send a GET HTTP request with a specific ID.
export default async function handler(req, res) {
  try {
    const {
      query: { id },
    } = req;
    const record = await applicationTable.find(id);
    const minifiedRecord = getMinifiedApplicantRecord(record);
    res.statusCode = 200;
    res.json(minifiedRecord);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: err });
  }
}
