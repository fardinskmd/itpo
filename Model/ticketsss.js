const mongoose = require('mongoose');

const ticketssSchema = new mongoose.Schema({
    urnno:{
        type:String
    },
    date:{
        type:String
    },
    validity:{
        type:String
    },
    time:{
        type:String
    },
   id:{
        type:String
    },
    status:{
        type:String,
        default:"Unmarked"
    },
    userid:{type: mongoose.Schema.Types.ObjectId, ref:"user"},

    
    
  
}, { timestamps: true });


module.exports = mongoose.model('offlineticket', ticketssSchema);