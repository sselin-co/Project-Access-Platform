const Airtable = require('airtable');
const base = new Airtable({apiKey:process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);


class Student {
    static async signUp(email, firstname, lastname, password){
      return base('Application').create({
        "email": email,
        "firstname": firstname,
        "lastname": lastname,
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
      try{
        return base('Application').select({
          filterByFormula: `email = '${email}'`,
          fields: ["status"]
        }).firstPage(function(err, records) {
          records.forEach(function(record){
            if (err) {console.error(err); return;}
            console.log('Retrieved application status for', record.get("email"));
            return record.get("status");
          })
        });
      } catch(err){
        console.error(err);
      }
    }
  }
  module.exports = Student;