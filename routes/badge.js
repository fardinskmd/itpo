const express= require('express')
const route= express.Router()
const badge= require('../Controller/badge')







route.post('/addbadge',badge.addbadge)
route.get('/getbadge',badge.getbadge)
route.get('/getbadges/:_id',badge.getbadgedataBySMBID)
route.post('/getbadgebycitizentype',badge.getbadgebycitizentype)
route.get('/getBadgeByMobile/:id',badge.getByNumber)
 route.post('/paynow',badge.paynow)
 route.post('/getpaymentstatus',badge.getpaymentstatus)
 route.post('/callback',badge.callback)
 route.get('/gettotalticket',badge.gettotalticket)
route.post('/updatebadgestatus',badge.updatebadgestatus)
route.post('/updatePaymentStatus',badge.updatePaymentStatus)
route.get('/gettotalscanneduser',badge.gettotalscaneeduser)
route.get('/getbuisnessdaybooking',badge.getbuinessdaybooking)
route.get('/getnonbuisnessdaybooking',badge.getnonbuinessdaybooking)
route.get('/gettotalscaneeduserdata',badge.gettotalscaneeduserdata)
route.get('/gettotalscaneeduserdatainadmin',badge.gettotalscaneeduserdatainadmin)
route.get('/gettotalpayment',badge.gettotalpayment)
route.get('/getbadgebyurnnumber/:urnno',badge.getbadgebyurnnumber)
route.post('/thankuPage',badge.thankuPage)
module.exports=route