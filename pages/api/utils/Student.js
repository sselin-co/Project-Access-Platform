const Airtable = require('airtable');
const base = new Airtable({apiKey:'YOUR_API_KEY'}).base('appVy0E4t0U8bC7AT');

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
        base('Application').select({
          filterByFormula: `email = '${email}'`,
          fields: ["password"]
        }, function(err, record) {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Retrieved credentials for', record.get("email"));
          return password === record.get("password");
        });
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