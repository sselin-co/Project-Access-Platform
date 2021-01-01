import { getSession } from 'next-auth/client'
import Student from "../../utils/Student.js"
import Course from "../../utils/Course.js"
/**
 * (student only) get detailed info about a module by id
 * @name GET /api/student/learning-modules/{id}
 * 
 * (student only) submit assignment to a module
 * @name POST /api/student/learning-modules/{id}
 * req.body = {submission : completed assignment file to be submitted}
 */
export default async (req, res) => {
  const session = await getSession({ req })

  if (session && session.user.name === "admin") {
    try{
        const {
            query: { id },
        } = req;
        
        if (req.method === 'GET'){
            const course = await Course.getCourse(id);
            console.log(course);
            res.status(200).json({course: course, message: `info for course ${id} loaded`});
        } else if (req.method === 'POST'){
            const { submission } = req.body;
            const course = await Course.getCourse(id);
            const module_number = course.module_number;
            const student = await Student.getApplicationId(req.session.user.email);
            //for testing, const student = await Student.getApplicationId("rachel@kindangen.com");
            await Student.submitAssignment(student, module_number, submission);
            res.status(200).json({message: `Successfully submitted assignment to ${id}`});
        }
    } catch (err) {
        console.log("error", err);
        res.status(400).json({error: err});
    }
  } else {
    res.send({ error: 'You must be sign in as an admin to view the protected content on this page.' })
  }
}
