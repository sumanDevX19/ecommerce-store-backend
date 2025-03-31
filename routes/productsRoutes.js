const express = require('express');
const router  = express.Router();
const productModel = require('../models/product.model')
const upload = require('../config/multer.config')
const adminIsLoggedIn = require('../middleware/adminIsLoggedIn');


router.post('/create', upload.single('image'),async (req,res)=>{
    try{

        let {name, price, discount, bgcolor, panelcolor, textcolor} = req.body;

        if(!name || !price || !discount ){
            return res.status(400).redirect('/owners/admin')
        }
            let product = await productModel.create({
                image:req.file.buffer,
                name,
                price,
                discount,
                bgcolor,
                panelcolor,
                textcolor
        
            })
            req.flash('success',"Product Created Successfully")
            return res.status(200).redirect('/owners/admin')

    }
    catch(err){
        console.log(err.message)
        return res.status(500).redirect('/owners/admin')
    }


})




module.exports = router