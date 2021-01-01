import { applicationTable } from "./utils/Airtable";

export default async function handler(req, res) {
  try {
    const { id, fields } = req.body;
    const updatedRecord = await applicationTable.update([{ id, fields }]);
    res.statusCode = 200;
    res.json(updatedRecord);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: err });
  }
}
