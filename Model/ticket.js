const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    startdate:{
        type:String
    },
    enddate:{
        type:String
    },
    validity:{
        type:String
    },
    tickettype:{
        type:String
    },
    
    
  
}, { timestamps: true });


module.exports = mongoose.model('ticket', ticketSchema);