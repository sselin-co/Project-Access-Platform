const Airtable = require('airtable');
const base = new Airtable({apiKey:process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

class Course {
  static async getCourses(level){
    return base('Modules').select({
      view: `${level}`
      }).firstPage();
  }

  static async courseOverview(records){
    const ret = records.map(
      record => {return {
        id: record.getId(), 
        module_number: record.get("module_number"), 
        title: record.get("title"), 
        deadline: record.get("deadline"), 
        content: record.get("content"), 
        assignment: record.get("assignment"), 
        level: record.get("level")
      };}
    );
    return ret;
  }

  static async updateTitle(id, title){
    base('Modules').update([
      {
        id: `${id}`,
        fields: {
          title: `${title}`
        }
      }
    ], function(err, records){
      if (err){
        console.error(err);
        return;
      }
      console.log('updated title for ', records[0].get('module_number'));
    })
  };
  static async updateContent(id, content){
    base('Modules').update([
      {
        id: `${id}`,
        fields: {
          content: `${content}`
        }
      }
    ], function(err, records){
      if (err){
        console.error(err);
        return;
      }
      console.log('updated content for ', records[0].get('module_number'));
    })
  };
  static async updateDeadline(id, deadline){
    base('Modules').update([
      {
        id: `${id}`,
        fields: {
          deadline: `${deadline}`
        }
      }
    ], function(err, records){
      if (err){
        console.error(err);
        return;
      }
      console.log('updated deadline for ', records[0].get('module_number'));
    })
  };
  static async updateAssignment(id, assignment){
    base('Modules').update([
      {
        id: `${id}`,
        fields: {
          assignment: `${assignment}`
        }
      }
    ], function(err, records){
      if (err){
        console.error(err);
        return;
      }
      console.log('updated assignment for ', records[0].get('module_number'));
    })
  }
}
module.exports = Course;