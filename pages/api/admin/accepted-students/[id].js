import { getSession } from 'next-auth/client';
import Admin from '../../utils/Admin.js';
import Student from "../../utils/Student.js";
import Mailer from '../../utils/Mailer.js';
/**
 * (admin only) get detailed info about an accepted student by id
 * @name GET /api/admin/accepted-students/{studentid}
 * 
 * (admin only) give feedback to student assignment
 * @name POST /api/admin/accepted-students/{studentid}
 * 
 * (admin only) send student email reminder
 * @name POST /api/admin/accepted-students/{studentid}
 */
export default async (req, res) => {
  const session = await getSession({ req })

  if (session && session.user.name === "admin") {
    try{
        const {
            query: { id },
        } = req;

        if (req.method === 'GET'){
            const student = await Student.oneAccepted(id);
            console.log(student);
            res.status(200).json({student: student, message: `info for student ${id} loaded`});
        } else if (req.method === 'POST'){
            const { module_number, feedback } = req.body;
            if (module_number && feedback){
              await Admin.giveFeedback(id, module_number, feedback);
              res.status(200).json({message: `Successfully given feedback to student ${id}`});
            } else{
              const email = await Student.getEmail(id);
              await Mailer.mail(email, `Reminder: Project Access Homework`, `Your coach from Project Access is reminding you that one of your module deadline is approaching.`);
              res.status(200).json({message: `Successfully sent reminder email to student ${id}`});
            }
        }
    } catch (err) {
        console.log("error", err);
        res.status(400).json({error: err});
    }
  } else {
    res.send({ error: 'You must be sign in as an admin to view the protected content on this page.' })
  }
}
