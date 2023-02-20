const mongoose = require('mongoose');

const qruserSchema = new mongoose.Schema({
    email:{
        type:String
    },
    name:{
        type:String
    },
    mobile:{
        type:String
    },
    password:{
        type:String
    }
    
    
  
}, { timestamps: true });


module.exports = mongoose.model('qruser', qruserSchema);