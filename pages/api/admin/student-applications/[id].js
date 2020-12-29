import Admin from '../../utils/Admin';
import { getSession } from 'next-auth/client'
/**
 * Update a student's application status
 * @name POST /api/admin/student-application/id
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
                Admin.updateAppStatus(id, status);
                res.json(`Status for student ${id} updated successfully.`);
            }catch (err) {
                res.error({error: err});
            }
        }
    }else{
        res.send({ error: 'You must be sign in to view the protected content on this page.' });
    }
}