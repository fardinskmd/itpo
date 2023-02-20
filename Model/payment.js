const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    MID:{
        type:String
    },
    TXNID:{
        type:String
    },
ORDERID:{
        type:String
    },
    TXNAMOUNT:{
        type:String
    },
    PAYMENTMODE:{
        type:String
    },
  
    CURRENCY:{
        type:String,
       
    },
    STATUS:{
        type:String,
       
    },
    RESPCODE:{
        type:String,
       
    },
    RESPMSG:{
        type:String,
       
    },
    GATEWAYNAME:{
        type:String,
       
    },
    BANKTXNID:{
        type:String,
       
    },
    BANKNAME:{
        type:String,
       
    },
  

    
    
  
}, { timestamps: true });


module.exports = mongoose.model('payment', paymentSchema);