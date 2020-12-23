import { table } from "./utils/Airtable";

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const deletedRecords = await table.destroy([id]);
    res.statusCode = 200;
    res.json(deletedRecords[0]);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: err });
  }
}
