import Admin from '../../utils/Admin';
import Mailer from '../../utils/Mailer';
import Student from '../../utils/Student';
import { getSession } from 'next-auth/client'
/**
 * Update a student's application status
 * @name POST /api/admin/student-applications/id
 */
export default async (req, res) => {
    const session = await getSession({ req });
    if (session && session.user.name === "admin"){
        const {
            query: { id },
        } = req;
        if (req.method === 'POST'){
            const { status } = req.body;
            try{
                await Admin.updateAppStatus(id, status);
                const receiver = await Student.getEmail(id);
                await Mailer.mail(receiver, "Project Access: Your application status has updated", "Hi, your application status has been updated. Please check on our website.");
                res.status(200).json({message: `Status for student ${id} updated successfully.`});
            }catch (err) {
                res.status(400).json({error: err});
            }
        }
    }else{
        res.send({ error: 'You must be sign in to view the protected content on this page.' });
    }
}