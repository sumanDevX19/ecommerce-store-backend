const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn')
const productModel = require('../models/product.model')
const userModel = require('../models/user.model')

router.get('/', (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('index',{ error, isLogin:false, success });
});

router.get('/shop', isLoggedIn, async (req, res) => { 
    let success = req.flash('success');

    let products = await productModel.find();
    res.render('shop', {products,success});
});

router.get('/addtocart/:productId',isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email:req.user.email})
    let productID = req.params.productId;

    user.cart.push(productID);
    await user.save();
    req.flash('success','Product Added To Cart');
    res.redirect('/shop');
    
});

router.get('/removefromcart/:productId',isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email:req.user.email})
    let index = user.cart.indexOf(req.params.productId);
    if(index!== -1){
        user.cart.splice(index,1);
        await user.save();
        res.status(200).redirect('/cart')
    }
    
    
    });

router.get('/cart', isLoggedIn,async (req, res) => {

    let user = await userModel.findOne({email:req.user.email}).populate('cart');
    res.render('cart',{ cart: user.cart})

});

module.exports = router;