import { getSession } from 'next-auth/client'
import Course from "../../utils/Course.js"

/**
 * (admin only) see detailed info about a course by its id
 * @name GET api/admin/learning-modules/{courseid}
 * 
 * (admin only) update information about a course by its id
 * @name PUT api/admin/learning-modules/{courseid}
 */
export default async (req, res) => {
  const session = await getSession({ req })

  if (session && session.user.name === "admin") {
    try{
        const {
            query: { id },
        } = req;

        if (req.method === 'PUT'){
            const { content, deadline, assignment, title } = req.body;

            if (title !== undefined){
                await Course.updateTitle(id, title);
            }

            if (content !== undefined){
                await Course.updateContent(id, content);
            }

            if (deadline !== undefined){
                await Course.updateDeadline(id, deadline);
            }

            if (assignment !== undefined){
                await Course.updateAssignment(id, assignment);
            }

            res.status(200).json({message:`course ${id} updated successfully.`});
        }
        else if (req.method === 'GET'){
            const course = await Course.getCourse(id);
            res.status(200).json({course: course});
        }
    } catch (err) {
        console.log("error", err);
        res.status(400).json({error: err});
    }
  } else {
    res.send({ error: 'You must be sign in as an admin to view the protected content on this page.' })
  }
}
