const express = require('express');

const Admin = require('../models/Admin');
const Student = require('../models/Student');

const router = express.Router();

/**
 * Sign in to admin account.
 * 
 * @name POST /api/admin/signin
 */
router.post('/signin', [], async(req, res) =>{
    if (req.body.email.length === 0 || req.body.password.length === 0){
        res.status(400).json({error: `Please enter email and password`}).end();
    } else{
        if(Admin.checkAuthentication(req.body.email, req.body.password)){
            req.session.username=req.body.email;
            res.status(200).json({name: req.body.email, message:"Admin sign-in successful."}).end();
          }else{
            res.status(400).json({error: `Credentials incorrect`}).end();
          }
    }
});

router.post('/signout', [], async(req, res) =>{
    if (req.session.username !== undefined){
        req.session.username = undefined;
        res.status(200).json({message: `Sign out success`});
    } else{
        res.status(400).json({error: `You are not currently signed in.`});
    }
});
module.exports = router;