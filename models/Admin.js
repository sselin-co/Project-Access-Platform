const Airtable = require('airtable');
const base = new Airtable({apiKey:'YOUR_API_KEY'}).base('appVy0E4t0U8bC7AT');

class Admin {
    static async checkAuthentication(email, password){
      return base('Admin').select({
        filterByFormula: `email = '${email}'`,
        fields: ["email", "password"]
      }, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Retrieved', record.get("email"));
      }).then(record => record.get("email") === email && record.get("password") === password);
    }
  }
  module.exports = Admin;