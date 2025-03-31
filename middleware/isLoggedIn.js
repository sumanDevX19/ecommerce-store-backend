const cookieParser = require('cookie-parser');
const express = require('express');
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash('error',"You Need To Login")
        return res.status(400).redirect('/');
    }

    try{
        let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        let user = await userModel.findOne({_id:decode.id}).select('-password');

        req.user = user;
        next();
    }
    catch(err){
        req.flash('error',"Something Went Wrong")
        res.status(400).redirect('/');
    }


}