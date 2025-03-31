const express = require('express');
const router  = express.Router();
const ownerModel = require('../models/owner.model')
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');
const { comparePassword } = require('../utils/passwordHashing')
const genarateToken = require('../utils/generateToken');
const adminIsLoggedIn = require('../middleware/adminIsLoggedIn')
const upload = require('../config/multer.config')




if(process.env.NODE_ENV === 'development'){
    router.post('/create',async (req,res)=>{
        let owner = await ownerModel.find();
        if(owner.length > 0){
            return res.status(400).json({msg:'Owner already exists'})
        }

        let {fullname, email, password} = req.body;

        let newowner = await ownerModel.create({fullname, email, password})

        return res.status(201).json(newowner)


    })
    
}

router.get('/admin',adminIsLoggedIn,(req,res)=>{
    let success = req.flash('success');
    res.render('createProducts',{ success })
})

router.get('/login',(req,res)=>{
    let error = req.flash('error');
    res.render('owner-login',{isLogin:false , error})
})

router.post('/adminlogin', async (req,res)=>{
    let {email, password} = req.body;
    if(!email || !password){
        req.flash('error','please provide all require fields')
        return res.status(400).redirect('/owners/login')
    }
    
    let user = await ownerModel.findOne({email});
    if(user === null){
        req.flash('error','please provide a valid email or password')
        return res.status(400).redirect('/owners/login')
    }

    let isMatch = false;
    if(user.password === password){
        isMatch= true
    }
    if(!isMatch){
        req.flash('error','please provide a valid email or password')
        return res.status(400).redirect('/owners/login')
    }

    if(isMatch){
        let token = genarateToken(user);
        res.cookie('atoken',token)
        return res.status(200).redirect('/owners/allproducts')

    }
})

router.get('/allproducts',adminIsLoggedIn, async (req,res)=>{
    let products = await productModel.find();
    res.render('allproducts',{ products })

})

router.get('/updateproduct/:productid', adminIsLoggedIn,async (req,res)=>{
    let product = await productModel.findOne({_id:req.params.productid});
    let success = req.flash('success');

    res.render('updateproduct',{product,success})

})

router.post('/update-product/:productid', upload.single('image'),adminIsLoggedIn , async(req,res)=>{
    let{name, price, discount, bgcolor,panelcolor} = req.body;
    // console.log(name);
    
    
    try{
        
        
        let updateData = {name, price, discount, bgcolor, panelcolor};
        if(req.file){
            updateData.image = req.file.buffer;
        }
        
        await productModel.findByIdAndUpdate(req.params.productid,updateData,{new:true});
        // req.flash('success','Product updated successfully')
        
        
        res.redirect('/owners/allproducts')

    }
    catch(err){
        res.redirect('/owners/allproducts')
    }

    

})



router.get('/logout',(req,res)=>{
    res.clearCookie('atoken');
    res.status(200).redirect('/owners/login')

});






module.exports = router