const express= require('express')
const route= express.Router()
const ticket= require('../Controller/ticket')







route.post('/ticket',ticket.addticket)
route.post('/getticket',ticket.getticket)
// route.post('/addprice',ticket.addprice)
route.get('/getticketbyid',ticket.getticketbyid)
route.get('/getpricebyticketid/:_id',ticket.getpricebyticketid)
route.post('/getpricebyticketidanddate',ticket.getpricebyticketidanddate)
route.post('/getpricebyid',ticket.getpricebyid)
route.get('/gettickettypebyid/:_id',ticket.gettickettypebyid)
 route.post('/getdatabybadge',ticket.getdatabybadge)
 //update badge status
 route.post('/getdatabybadge',ticket.getdatabybadge)
 route.post('/updatebadgestatus',ticket.updatebadgestatus)

module.exports=route