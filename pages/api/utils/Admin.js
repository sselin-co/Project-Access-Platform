const Airtable = require('airtable');
const base = new Airtable({apiKey:process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

class Admin {
  static async checkAuthentication(email, password){
    try{
      return base('Admin').select({
        filterByFormula: `email = '${email}'`,
        fields: ["email", "password"]
      }).firstPage(function(err, records) {
        records.forEach(function(record){
          if (err) {console.error(err); return;}
          console.log('Retrieved', record.get("email"));
          return record.get("email") === email && record.get("password") === password;
        })
      });
    } catch(err){
      console.error(err);
    }
  }
}
module.exports = Admin;