import { modulesTable } from "./utils/Airtable";

export default async function handler(req, res) {
  try {
    const records = await modulesTable.select({}).firstPage();
    res.statusCode = 200;
    res.json(records);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: err });
  }
}
