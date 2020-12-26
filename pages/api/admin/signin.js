import Admin from "../utils/Admin";

export default async function handler(req, res) {
  if (req.body.email.length === 0 || req.body.password.length === 0){
    res.status(400).json({error: `Please enter email and password`});
} else{
    if(Admin.checkAuthentication(req.body.email, req.body.password)){
        //req.session.username=req.body.email;
        res.status(200).json({name: req.body.email, message:"Admin sign-in successful."});
      }else{
        res.status(400).json({error: `Credentials incorrect`});
      }
  }
};