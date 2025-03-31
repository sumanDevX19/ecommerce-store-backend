const jwt = require('jsonwebtoken');
const express = require('express');
const ownerModel = require('../models/owner.model')


module.exports = async (req, res, next) => {
    if(!req.cookies.atoken){
        req.flash('error','Please Log in')
        res.status(400).redirect('/owners/login')
    }

    try{
        let decode = jwt.verify(req.cookies.atoken, process.env.JWT_KEY);
        let owner = await ownerModel.findOne({_id:decode.id});

        req.owner = owner
        next()

    }
    catch(err){
        req.flash('error','Something went wrong')
        res.status(400).redirect('/owners/login')

    }

    
}