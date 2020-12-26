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

    static async signIn(email, password){
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
  }
  module.exports = Student;