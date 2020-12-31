const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

class Student {
  static async signUp(email, firstname, lastname, password){
    return base('Student').create({
      "email": email,
      "first_name": firstname,
      "last_name": lastname,
      "password": password,
    }).then((student) => {
      console.log(`Account created successfully for ${student.getId()}`);
      return {id: student.getId(), email: student.get("email")};
    }).catch((err) =>{
      console.log(err);
      throw err;
    });
  }

  static async checkAuthentication(email, password){
    let records = await base('Student').select({
      filterByFormula: `email = '${email}'`,
      fields: ["email", "password"],
      }).firstPage();
    if (records.length === 0) {
      console.log("email does not exist");
      return false;
    } else {
      return (
        records[0].get("email") === email &&
        records[0].get("password") === password
      )
    }
  }

  static async nameReturn(email, col) {
    let records = await base('Student').select({
      filterByFormula: `email = '${email}'`,
      fields: ["email", col]
    }).firstPage();
    if (records.length === 0) { console.log("email does not exist"); return false; }
    else {
      return records[0].get(col);
    }
  }

  static async getStatus(email){
    let records = await base('Application').select({
      filterByFormula: `email = '${email}'`,
      fields: ["status", "email"]
    }).firstPage(); 

    if (records.length === 0) {console.log("not an applicant"); return "non-applicant";}
    console.log('Retrieved application status for', records[0].get("email"));
    return records[0].get("status");
  }
}
module.exports = Student;
