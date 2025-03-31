const express = require('express');
const router  = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn')
const {userRegister, userLogin, userLogout} = require('../controllers/authController');
const userModel = require('../models/user.model');
const { set } = require('mongoose');

router.get('/',(req,res)=>{
    res.send('Billionaire Suman Saha User')
})

router.post('/register', userRegister)

router.post('/login', userLogin)

router.get('/account', isLoggedIn, (req,res)=>{
    res.render('account', {user:req.user})
});

router.post('/update-account/:userId', isLoggedIn ,async(req,res)=>{
    let {name, email} = req.body;
    // console.log(name,email);
    
    let user = await userModel.findOne({email:req.user.email});
    
    if(req.params.userId === user._id.toString()){
        await userModel.findOneAndUpdate({_id:user._id},{"$set":{fullname:name,email}},{new:true});
        
        res.status(200).redirect('/users/account')

    }
    else{
        res.status(401).redirect('/users/account')
    }
    
    
})

router.get('/logout', userLogout)

module.exports = router