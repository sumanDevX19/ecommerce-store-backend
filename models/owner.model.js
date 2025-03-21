const mongoose = require('mongoose');




let ownerSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password: String,
    products:[
        {type:mongoose.Schema.Types.ObjectId, ref:'product'}
    ],
    picture: String,
    gstin:String

})

module.exports = mongoose.model('owner',ownerSchema)


