const mongoose = require('mongoose');




let productSchema = mongoose.Schema({
    image: Buffer,
    name:String,
    price: Number,
    discount: {
        type:Number,
        default:0
    },
    bgcolor:{
        type:String,
        default:'#212121'
    },
    panelcolor:{
        type:String,
        default:'#1a1a1a'
    },
    textcolor:{
        type:String,
        default:'#fff'
    }



})

module.exports = mongoose.model('product',productSchema)


