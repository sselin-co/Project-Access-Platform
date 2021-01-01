import { getSession } from 'next-auth/client'
import Course from "../utils/Admin.js"
import Student from "../utils/Student.js"

/**
 * (admin only) get an overview of all accepted students
 * 
 * @name GET /api/admin/accepted-students
 */
export default async (req, res) => {
  const session = await getSession({ req })

  if (session && session.user.name === "admin") {
    try{
        const students = await Student.allAccepted();
        console.log(students);
        res.status(200).json({accepted: students, message: `All accepted students loaded.`});
    } catch (err) {
        console.log("error", err);
        res.status(400).json({error: err});
    }
  } else {
    res.send({ error: 'You must be sign in as an admin to view the protected content on this page.' })
  }
}
