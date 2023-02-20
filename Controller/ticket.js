const mongoose = require("mongoose")
const login=require('../Model/login')
const qruser=require('../Model/qruser')
const ticketss=require('../Model/ticket')
const prices=require('../Model/price')
const offlineticket=require('../Model/ticketsss')
const badge=require('../Model/badge')

exports.addticket = async (req, res) => {

    const { startdate,enddate,validity,tickettype} = req.body;
  
    try {
  
      const newproductcategory = new ticketss({ enddate,startdate,validity,tickettype});
      const tickets = await newproductcategory.save();
      if (tickets) {
        res.status(200).json({
          Message: "User Added Succsesfully", tickets
        });
      }
  
    } catch (err) {
      console.log(err)
    }
  }

  exports.getticket = async (req, res) => {

    try {
      const getticket = await ticketss.find();
      console.log(getticket)
      return res.json(getticket);
    } catch (err) {
      res.json({ message: "no crop Found" });
    }
  };

  //get ticket by id

  module.exports.getticketbyid = async (req, res, next) => {
    let id = req.params._id;
    let getticketbyid = await ticketss.findById(id)
    console.log(getticketbyid)
    if (getticketbyid) {
      return res.status(200).json({ msg: "tickets get successfulley", getticketbyid })
    } else {
      return res.status(400).json({ msg: "tickets  not found with given id" })
    }
  
  };


  // exports.addprice = async (req, res) => {

  //   const { date,price,citizentype,ticketid} = req.body;
  
  //   try {
  
  //     const newproductcategory = new prices({ date,price,citizentype,ticketid });
  //     const tickets = await newproductcategory.save();
  //     if (tickets) {
  //       res.status(200).json({
  //         Message: "User Added Succsesfully", tickets
  //       });
  //     }
  
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


  module.exports.getpricebyticketid = async (req, res, next) => {
    let id = req.params._id;
    let getticketbyid = await prices.findById(id).populate('ticketid')
    console.log(getticketbyid)
    if (getticketbyid) {
      return res.status(200).json({ msg: "tickets get successfulley", getticketbyid })
    } else {
      return res.status(400).json({ msg: "tickets  not found with given id" })
    }
  
  };

  module.exports.getpricebyticketidanddate = async (req, res, next) => {
    let id = req.body.id;
    Citizentype=req.body.citizentype
    Dates=req.body.date

    let getticketbyid = await prices.find({citizentype:Citizentype,date:Dates})
    console.log(req.body)
    if (getticketbyid) {
      return res.status(200).json({ msg: "tickets get successfulley", getticketbyid })
    } else {
      return res.status(400).json({ msg: "tickets  not found with given id" })
    }
  
  };



  module.exports.gettickettypebyid = async (req, res, next) => {
    let id = req.params._id;

let getticketbyid = await ticketss.findOne({id:req.params._id})
    console.log(req.body)
    if (getticketbyid) {
      return res.status(200).json({ msg: "tickets get successfulley", getticketbyid })
    } else {
      return res.status(400).json({ msg: "tickets  not found with given id" })
    }
  
  };



  module.exports.getpricebyid = async (req, res, next) => {
   let ticketid = req.body.ticketid;
   console.log(ticketid)

    let resultData = await prices.find({ticketid:req.body.ticketid})
    console.log(req.body)
    if (resultData) {
      return res.status(200).json({ msg: "tickets get successfulley", resultData })
    } else {
      return res.status(400).json({ msg: "tickets  not found with given id" })
    }
  
  
  };



  exports.getdatabybadge = async (req, res) => {
    var datetime = new Date();
    console.log(datetime)
    badge.findOne({ urnno : req.body.urnno})  
    .then(result=>{
        res.status(200).json({
        resultData:result,datetime
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            "error":"Id not matched in records"
        })
  });
  }




// exports.updatebadgestatus = async (req, res) => {
//   let id = req.body._id;
//   let urnno= req.body.urnno;
//   let userid = req.body.userid;
// let status = req.body.status;
// console.log(id)

//   const newfamerimage = await offlineticket.findOne({id:req.body._id});
 
//   if(newfamerimage){
//      let imageupdate = await offlineticket.findByIdAndUpdate(id,{
//       status,urnno,userid
//      });
//      let updatecountry = await imageupdate.save();
//      res.status(200).json({
//       Mesaage: "Badge status updated succsefully",imageupdate
//     });
//   }else{
//       res.status(200).json({
//           Mesaage: "images not Succsesfully"
//         });
//      }
// }

//update badge status

exports.updatebadgestatus = async (req, res) => {
  let Id = req.body.id;
//    let batchid = req.body.batchid;
let status = req.body.status;

const newfamerimage = await offlineticket.findById({_id:mongoose.Types.ObjectId(req.body.id)});
  console.log(newfamerimage)
  if(newfamerimage){
     let imageupdate = await offlineticket.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id),{
      status
     });
   
     let updatecountry = await imageupdate.save();

     res.status(200).json({
      Mesaage: "Badge status updated succsefully",imageupdate
    });
  }else{
      res.status(200).json({
          Mesaage: "images not Succsesfully"
        });
     }
}

