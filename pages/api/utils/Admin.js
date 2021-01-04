const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

class Admin {
  static async checkAuthentication(email, password) {
    let records = await base("Admin")
      .select({
        filterByFormula: `email = '${email}'`,
        fields: ["email", "password"],
      })
      .firstPage();
    if (records.length === 0) {
      console.log("email does not exist");
      return false;
    } else {
      return (
        records[0].get("email") === email &&
        records[0].get("password") === password
      );
    }
  }

  static async updateAppStatus(id, status) {
    await base("Application").update(
      [
        {
          id: `${id}`,
          fields: {
            status: `${status}`,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error("Error in Admin.js: " + err);
          return;
        }
        console.log("Succesful update for " + records[0].get("email"));
      }
    );
  }

  static async nameReturn(email, col) {
    let records = await base("Admin")
      .select({
        filterByFormula: `email = '${email}'`,
        fields: ["email", col],
      })
      .firstPage();
    if (records.length === 0) {
      console.log("email does not exist");
      return false;
    } else {
      return records[0].get(col);
    }
  }

  static async giveFeedback(student_id, module_number, feedback) {
    switch (module_number) {
      case 1:
        await base("Application").update(
          [
            {
              id: `${student_id}`,
              fields: {
                feedback_1: `${feedback}`,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error("Error in Admin.js: " + err);
              return;
            }
            console.log("Succesful update for " + records[0].get("email"));
          }
        );
        break;
      case 2:
        await base("Application").update(
          [
            {
              id: `${student_id}`,
              fields: {
                feedback_2: `${feedback}`,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error("Error in Admin.js: " + err);
              return;
            }
            console.log("Succesful update for " + records[0].get("email"));
          }
        );
        break;
      case 3:
        await base("Application").update(
          [
            {
              id: `${student_id}`,
              fields: {
                feedback_3: `${feedback}`,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error("Error in Admin.js: " + err);
              return;
            }
            console.log("Succesful update for " + records[0].get("email"));
          }
        );
        break;
      case 4:
        await base("Application").update(
          [
            {
              id: `${student_id}`,
              fields: {
                feedback_4: `${feedback}`,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error("Error in Admin.js: " + err);
              return;
            }
            console.log("Succesful update for " + records[0].get("email"));
          }
        );
        break;
      case 5:
        await base("Application").update(
          [
            {
              id: `${student_id}`,
              fields: {
                feedback_5: `${feedback}`,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error("Error in Admin.js: " + err);
              return;
            }
            console.log("Succesful update for " + records[0].get("email"));
          }
        );
        break;
      case 6:
        await base("Application").update(
          [
            {
              id: `${student_id}`,
              fields: {
                feedback_6: `${feedback}`,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error("Error in Admin.js: " + err);
              return;
            }
            console.log("Succesful update for " + records[0].get("email"));
          }
        );
        break;
      default:
        throw "invalid module number";
    }
  }
}
module.exports = Admin;
