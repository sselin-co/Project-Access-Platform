import { getSession } from 'next-auth/client'
import Course from "../utils/Course.js"

/**
 * (admin only) get an overview of all undergrad or grad level courses
 * 
 * @name GET /api/admin/learning-modules?level=grad
 * @name GET /api/admin/learning-modules?level=undergrad
 * 
 * @param level is the query param. - "grad" or "undergrad"
 */
export default async (req, res) => {
  const session = await getSession({ req })

  if (session && session.user.name === "admin") {
    try{
      const { level } = req.query;
        let courses = await Course.getCourses(level);
        courses = await Course.courseOverview(courses);
        console.log(courses);
        res.status(200).json({courses: courses, message:`${level} courses obtained successfully.`});
    } catch (err) {
        console.log("error", err);
        res.status(400).json({error: err});
    }
  } else {
    res.send({ error: 'You must be sign in as an admin to view the protected content on this page.' })
  }
}
