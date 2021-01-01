import { getSession } from 'next-auth/client'
import Course from "../utils/Course.js"
import Student from "../utils/Student.js"

/**
 * (student only) get an overview of all courses available for their level
 * 
 * @name GET /api/student/learning-modules
 */
export default async (req, res) => {
  const session = await getSession({ req })

  if (session && session.user.name === "student") {
    try{
        //const education_level = await Student.getGradeLevel("rachel@kindangen.com");  for testing
        const education_level = await Student.getGradeLevel(session.user.email);
        let level;
        if (education_level === "Undergraduate Applicant") level = 'undergrad';
        else level = 'grad';
        let courses = await Course.getCourses(level);
        courses = await Course.courseOverview(courses);
        console.log(courses);
        res.status(200).json({courses: courses, message:`${level} courses obtained successfully.`});
    } catch (err) {
        console.log("error", err);
        res.status(400).json({error: err});
    }
  } else {
    res.send({ error: 'You must be sign in as an accepted student to view the protected content on this page.' })
  }
}
