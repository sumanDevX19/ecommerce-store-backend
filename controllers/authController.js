const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const {hashPassword,comparePassword} = require('../utils/passwordHashing');
const generateToken = require('../utils/generateToken');

module.exports.userRegister = async (req,res)=>{
    try{
        let {fullname, email, password} = req.body;
        if (!fullname || !email || !password){
            return res.status(400).json({msg:'Please provide all fields'})
        }

        let user = await userModel.findOne({email});
        if(user){
            req.flash('error',"Account already exists")
            return res.status(400).redirect('/')
        }

        let hash = await hashPassword(password); 
        let newUser = await userModel.create({fullname, email, password:hash})

        let token = generateToken(newUser);
        res.cookie("token",token);
        
        req.flash('success',"Account created successfully");
        return res.status(201).redirect('/')
    }
    catch(err){
        res.send(err.message);
    }
    
}



module.exports.userLogin = async (req,res)=>{
    try{
        let {email, password} = req.body;
        if (!email || !password){
            return res.status(400).send('Please provide all fields');
        }
        let user = await userModel.findOne({email});
        if(!user){
            req.flash('error',"Not Valid email or password");
            return res.status(400).redirect('/');
        }

        
        
        let isMatch = comparePassword(password, user.password);

        if(!isMatch){
            req.flash('error',"Not Valid email or password");
            return res.status(400).redirect('/');
        }

        let token = generateToken(user);
        res.cookie("token",token);

        return res.status(200).redirect('/shop');





        
    }
    catch(err){
        res.send(err.message);
    }
}

module.exports.userLogout = (req,res)=>{
    res.clearCookie('token');
    res.status(200).redirect('/');
}