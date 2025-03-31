const mongoose = require('mongoose');




let ownerSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50,
        match:/^[a-zA-Z\s]+$/,
        validate:{
            validator: function(v){
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message:'Fullname must contain only alphabetic characters'
        }

    },
    email:String,
    password: String,
    products:[
        {type:mongoose.Schema.Types.ObjectId, ref:'product'}
    ],
    picture: {
        type:String,
        default:'default.jpg'
    },
    gstin:{
        type:String,
        default:""
    }

})

module.exports = mongoose.model('owner',ownerSchema)


