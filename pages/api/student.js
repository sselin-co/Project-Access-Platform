import Student from './utils/Student.js';

/**
 * Create new student account
 * @name POST /api/student
 */
export default async (req, res) => {
    if (req.method === 'POST'){
        const { email, firstname, lastname, password } = req.body;
        try{
            let student = await Student.signUp(email, firstname, lastname, password);
            res.status(200).json(student);
        }catch (err) {
            res.status(400).json({error: err});
        }
    }

}