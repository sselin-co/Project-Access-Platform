import { getSession } from 'next-auth/client'
import Student from "../utils/Student.js"

/**
 * Get a student's application status
 * 
 * @name GET /api/student/status
 */
export default async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    try{
        let status = await Student.getStatus(session.user.email);
        console.log(session.user.email, status);
        res.status(200).json({name: session.user.email, status: status, message:`Status obtained successfully.`});
    } catch (err) {
        console.log("error", err);
        res.status(400).json({error: err});
    }
  } else {
    res.send({ error: 'You must be sign in to view the protected content on this page.' })
  }
}
