import { applicationTable, minifyDashboardRecords } from "./utils/Airtable";

export default async function handler(req, res) {
  try {
    const records = await applicationTable.select({}).firstPage();
    const minifiedRecords = minifyDashboardRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: err });
  }
}
