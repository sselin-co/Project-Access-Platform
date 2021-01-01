import { getSession } from 'next-auth/client'
import Student from "../../utils/Student.js"

/**
 * (admin only) get detailed info about an accepted student by id
 * @name GET /api/admin/accepted-students/{studentid}
 */
export default async (req, res) => {
  const session = await getSession({ req })

  if (session && session.user.name === "admin") {
    try{
        const {
            query: { id },
        } = req;

        const student = await Student.oneAccepted(id);
        console.log(student);
        res.status(200).json({student: student, message: `info for student ${id} loaded`});
    } catch (err) {
        console.log("error", err);
        res.status(400).json({error: err});
    }
  } else {
    res.send({ error: 'You must be sign in as an admin to view the protected content on this page.' })
  }
}
