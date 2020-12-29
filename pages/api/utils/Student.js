const Airtable = require('airtable');
const base = new Airtable({apiKey:process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);


class Student {
    static async signUp(email, firstname, lastname, password){
      return base('Application').create({
        "email": email,
        "first_name": firstname,
        "last_name": lastname,
        "password": password
      }, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Account created for`, record.get("email"));
      });
    }

    static async checkAuthentication(email, password){
      let records = await base('Application').select({
        filterByFormula: `email = '${email}'`,
        fields: ["email", "password"]
      }).firstPage(); 
      if (records.length === 0) {console.log("email does not exist"); return false;}
      else{
        return records[0].get("email") === email && records[0].get("password") === password;
      }
    }

    static async getStatus(email){
      let records = await base('Application').select({
        filterByFormula: `email = '${email}'`,
        fields: ["status", "email"]
      }).firstPage(); 
      //console.log("records", records);
      if (records.length === 0) {console.log("email not in student database"); throw `You're not logged in as a student`;}
      console.log('Retrieved application status for', records[0].get("email"));
      return records[0].get("status");
    }
  }
  module.exports = Student;