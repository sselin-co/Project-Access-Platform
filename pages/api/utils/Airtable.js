/* 
Airtable.js: Calls the Airtable base through its API. Also contains utility functions for use with the CRUD operations we will perform on the base.
Import 'table' to access the base + any utility functions you need into the CRUD files.  
*/
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const applicationTable = base("Application");
const modulesTable = base("Modules");

const getMinifiedDashboardRecord = (record) => {
  return {
    fields: {
      id: record.get("id"),
      name: record.get("first_name") + " " + record.get("last_name"),
      email: record.get("email"),
      applyingFor: record.get("education_level"),
      applicationStatus: record.get("status"),
    },
  };
};

const minifyDashboardRecords = (records) => {
  return records.map((record) => getMinifiedDashboardRecord(record));
};

const getMinifiedApplicantRecord = (record) => {
  return {
    fields: {
      id: record.get("id"),
      name: record.get("first_name") + " " + record.get("last_name"),
      email: record.get("email"),
      applyingFor: record.get("education_level"),
      applicationStatus: record.get("status"),
      photo: record.get("photo"),
    },
  };
};

// Don't forget to export any new utility functions you write (mainly for Shaya).
export {
  applicationTable as applicationTable,
  modulesTable as modulesTable,
  getMinifiedDashboardRecord,
  minifyDashboardRecords,
  getMinifiedApplicantRecord,
};
