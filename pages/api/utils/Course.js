const Airtable = require('airtable');
const base = new Airtable({apiKey:process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

class Course { 
  static async updateContent(module_number, content){
    base('Modules').update([
      {
        "module_number": `${module_number}`,
        "fields": {
          "content": `${content}`
        }
      }
    ], function(err, records){
      if (err){
        console.error(err);
        return;
      }
      console.log(records[0].get('module_number'));
    })
  };
  static async updateDeadline(module_number, deadline){
    base('Modules').update([
        {
          "module_number": `${module_number}`,
          "fields": {
            "deadline": `${deadline}`
          }
        }
      ], function(err, records){
        if (err){
          console.error(err);
          return;
        }
        console.log(records[0].get('module_number'));
      })
  };
  static async updateAssignment(module_number, assignment){
    base('Modules').update([
        {
          "module_number": `${module_number}`,
          "fields": {
            "assignment": `${assignment}`
          }
        }
      ], function(err, records){
        if (err){
          console.error(err);
          return;
        }
        console.log(records[0].get('module_number'));
      })
  }
}
module.exports = Course;