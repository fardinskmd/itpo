const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    price:{
        type:String
    },
    date:{
        type:String
    },
    citizentype:{
        type:String
    },
    ticketid:{type: mongoose.Schema.Types.ObjectId, ref:"ticket"},
    
    
  
}, { timestamps: true });


module.exports = mongoose.model('Price', priceSchema);