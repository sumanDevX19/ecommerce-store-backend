const mongoose = require('mongoose');

const mongooseConnection = require('../config/mongoose.connection')


let userSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password: String,
    cart: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
    }],
    isAdmin : Boolean,
    orders:[
        {type:mongoose.Schema.Types.ObjectId, ref:'product'}
    ],
    contact: Number,
    picture: String

})

module.exports = mongoose.model('user',userSchema)


