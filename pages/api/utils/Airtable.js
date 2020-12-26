const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base(process.env.AIRTABLE_TABLE_NAME);

const getMinifiedDashboardRecord = (record) => {
  return {
    id: record.get("id"),
    name: record.get("first_name") + " " + record.get("last_name"),
    email: record.get("email"),
    applyingFor: record.get("education_level"),
    applicationStatus: record.get("status"),
  };
};

const minifyDashboardRecords = (records) => {
  return records.map((record) => getMinifiedDashboardRecord(record));
};

export { table, getMinifiedDashboardRecord, minifyDashboardRecords };
