const mongoose = require('mongoose');
const {
    randomBytes
  } = require('crypto');



const badgeSchema = new mongoose.Schema({
    name:{
        type:String
    },
 
    email:{
        type:String
    
    },
    date:{
        type:String
    },
    citizentype:{
        type:String
    },
    price:{
        type:Number
    },
    totalPrice:{
        type:String
    },
    totalTicket:{
        type:String
    },
    sNo:{
        type:String,
        trim:true,
        },
     bypassstatus:{
        type:String,
     },
    mobile:{
        type:Number
    },
    badgeid:{
        type:String,
        trim:true,

        },
    badge:{
        type:String,
        trim:true
    },
    ORDERID:{
        type:String,
        trim:true
    },
    bookingDate:{
        type:Date,
        default: new Date()
    },
    urnno:{
        type:String,
        default:Math.random().toString(36).slice(36) + randomBytes(1).toString('hex') + Date.now()
       
    },
    status:{
        type:String,
        default:"Unmarked"
    },
    paymentStatus:{
        type:String,
        default:"Unpaid"
    },
    updateat:{
        type:String,
       
    },
  
 userid:{
    
      type:String,
    },

   ticketid:{type: mongoose.Schema.Types.ObjectId, ref:"ticket"},
    
    
  
}, { timestamps: true });


module.exports = mongoose.model('badge', badgeSchema);