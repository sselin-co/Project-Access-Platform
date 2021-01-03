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

  static async appReturn(email, col) {
    let records = await base('Application').select({
      filterByFormula: `email = '${email}'`,
      fields: ["email", col]
    }).firstPage();
    if (records.length === 0) { console.log("email does not exist"); return false; }
    else {
      return records[0].get(col);
    }
  }

  static async appIdReturn(id, col) {
    let records = await base('Application').select({
      filterByFormula: `id = '${id}'`,
      fields: ["id", col]
    }).firstPage();
    if (records.length === 0) { console.log("id does not exist"); return false; }
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

  static async getGradeLevel(email){
    let records = await base('Application').select({
      filterByFormula: `email = '${email}'`,
      fields: ["education_level", "email"]
    }).firstPage(); 

    if (records.length === 0) {console.log("not an applicant"); return "non-applicant";}
    console.log(records[0].get("email"), "is a", records[0].get("education_level")[0]);
    return records[0].get("education_level")[0];
  }

  static async getApplicationId(email){
    let records = await base('Application').select({
      filterByFormula: `email = '${email}'`,
      fields: ["id", "email"]
    }).firstPage(); 

    if (records.length === 0) {console.log("not an applicant"); return "non-applicant";}
    console.log("app id retrieved for", records[0].get("email"));
    return records[0].get("id");
  }

  static async allAccepted(){
    const records = await base('Application').select({
      view: 'accepted'
    }).firstPage();

    const acceptedStudents = records.map(record => 
      {
        return {
          id: record.getId(),
          email: record.get("email"),
          first_name: record.get("first_name"),
          last_name: record.get("last_name"),
          education_level: record.get("education_level"),
          last_assignment_submitted: record.get("last_assignment_submitted"),
        };
      }
    )

    return acceptedStudents;
  }

  static async oneAccepted(id){
    const record = await base('Application').find(id);
    if (record.get("status") == "accepted")
    {const student = {
      id: record.getId(),
      email: record.get("email"),
      first_name: record.get("first_name"),
      last_name: record.get("last_name"),
      education_level: record.get("education_level"),
      last_assignment_submitted: record.get("last_assignment_submitted"), 
      module_1: record.get("module_1"),
      module_2: record.get("module_2"),
      module_3: record.get("module_3"),
      module_4: record.get("module_4"),
      module_5: record.get("module_5"),
      module_6: record.get("module_6"),
      feedback_1: record.get("feedback_1"),
      feedback_2: record.get("feedback_2"),
      feedback_3: record.get("feedback_3"),
      feedback_4: record.get("feedback_4"),
      feedback_5: record.get("feedback_5"),
      feedback_6: record.get("feedback_6"),
    };
    //console.log(student);
    return student;}
    else return false;
  }

  static async submitAssignment(student_id, module_number, submission){
    switch(module_number){
      case 1:
        base('Application').update([
        {
          id: `${student_id}`,
          fields: {
            module_1: `${submission}`
          }
        }
        ], function(err, records){
          if (err){
            console.error(err);
            return;
          }
        console.log('submission completed for', module_number);
        })
        break;
      case 2:
        base('Application').update([
        {
          id: `${student_id}`,
          fields: {
            module_2: `${submission}`
          }
        }
        ], function(err, records){
          if (err){
            console.error(err);
            return;
          }
        console.log('submission completed for', module_number);
        })
        break;
      case 3:
        base('Application').update([
        {
          id: `${student_id}`,
          fields: {
            module_3: `${submission}`
          }
        }
        ], function(err, records){
          if (err){
            console.error(err);
            return;
          }
        console.log('submission completed for', module_number);
        })
        break;
      case 4:
        base('Application').update([
        {
          id: `${student_id}`,
          fields: {
            module_4: `${submission}`
          }
        }
        ], function(err, records){
          if (err){
            console.error(err);
            return;
          }
        console.log('submission completed for', module_number);
        })
        break;
      case 5:
        base('Application').update([
        {
          id: `${student_id}`,
          fields: {
            module_5: `${submission}`
          }
        }
        ], function(err, records){
          if (err){
            console.error(err);
            return;
          }
        console.log('submission completed for', module_number);
        })
        break;
      case 6:
        base('Application').update([
        {
          id: `${student_id}`,
          fields: {
            module_6: `${submission}`
          }
        }
        ], function(err, records){
          if (err){
            console.error(err);
            return;
          }
        console.log('submission completed for', module_number);
        })
        break;
      default:
        throw "invalid module number";
    }
  }
}
module.exports = Student;
