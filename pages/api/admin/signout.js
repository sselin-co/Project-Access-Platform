export default async function handler(req, res) {
    if (req.session.username !== undefined){
        req.session.username = undefined;
        res.status(200).json({message: `Sign out success`});
    } else{
        res.status(400).json({error: `You are not currently signed in.`});
    }
  };