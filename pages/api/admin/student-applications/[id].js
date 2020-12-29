import Admin from '../../utils/Admin';

export default function handler(req, res) {
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

}