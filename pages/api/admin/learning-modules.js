import { getSession } from 'next-auth/client'
import Admin from "../utils/Admin.js"
import Course from "../utils/Course.js"

/**
 * 
 */
export default async (req, res) => {
  const session = await getSession({ req })

  if (session && session.user.name === "admin") {
    try{
        let status = await Student.getStatus(session.user.email);
        console.log(session.user.email, status);
        res.status(200).json({name: session.user.email, status: status, message:`Status obtained successfully.`});
    } catch (err) {
        console.log("error", err);
        res.status(400).json({error: err});
    }
  } else {
    res.send({ error: 'You must be sign in as an admin to view the protected content on this page.' })
  }
}
