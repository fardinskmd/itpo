import { environment } from "src/environments/environment.prod";

export class Globals {
    public static readonly server = environment.serverUrl;
    public static readonly route = {
        'reset-password': Globals.server + 'api/reset-password',
        'login': Globals.server + 'login/login',
        'verify-otp': Globals.server + 'api/verify-otp',
        'checkemail': Globals.server + 'api/checkemail',
        'sendmail': Globals.server + 'api/sendmail',
        'change-password': Globals.server + 'api/change-password',
        'reset-password-save': Globals.server + 'api/reset-password-save',
        'cropType':Globals.server+'agrioutputmaster/getcroptype',
        // 'getcropname':Globals.server+'agrioutputmaster/getagrioutputcrop',
        'addCrop':Globals.server+'agrioutputmaster/addagrioutputcrop',
        // 'upload':Globals.server+'farmer/uploadimage',
        'upload': Globals.server + 'upload',
        'getCrop':Globals.server+'agrioutputmaster/getagrioutputcrop',
        'deleteCrop':Globals.server+'agrioutputmaster/deleteagrioutputcrop',
        'updateCrop':Globals.server+'agrioutputmaster/updateagrioutputcrop',
        'getCropById':Globals.server+'agrioutputmaster/getagrioutputcropbyid',


        'getProfileCount':Globals.server+'farmer/getfarmervalue',
        'getUser':Globals.server+'farmer/getUser',
        'getUserCount':Globals.server+'farmer/getUservalue',
        'getappCount':Globals.server+'user/getappInstallsValue',


        'addVariety':Globals.server+'agrioutputmaster/addvariety',
        'getVariety':Globals.server+'agrioutputmaster/getvariety',
        'getVarietybyid':Globals.server+'agrioutputmaster/getvarietybyid',
        'updateVariety':Globals.server+'agrioutputmaster/updateVariety',
        'deleteVariety':Globals.server+'agrioutputmaster/deletevariety',
        'getVarietyByLanguage':Globals.server+'agrioutputmaster/getCropByLanguage',

        'addcroptype':Globals.server+'agrioutputmaster/addcroptype',
        'getcroptype':Globals.server+'agrioutputmaster/getcroptype',
        'getCroptypebyid':Globals.server+'agrioutputmaster/getcropbyid',
        'updateCropType':Globals.server+'agrioutputmaster/updatecroptype',
        'deleteCropType':Globals.server+'agrioutputmaster/deletecroptype',
        'getCropTypeByLanguage':Globals.server+'agrioutputmaster/getCropTypeByLanguage',



        //COUNTRY API

        'addCountry':Globals.server+'country/addcountry',
        'getCountry':Globals.server+'country/getcountry',
        'updateCountry':Globals.server+'country/updatecountry',
        'deleteCountry':Globals.server+'country/deletecountry',
        'checkCountry':Globals.server+'country/checkcountry',
        'getCountrybyid':Globals.server+'country/getcountrybyid',

        //state api

         //state API

         'addState':Globals.server+'state/addstate',
         'getState':Globals.server+'state/getstate',
         'updateState':Globals.server+'state/updatestate',
         'getStatebyid':Globals.server+'state/getstatebyid',
         'deleteState':Globals.server+'state/deletestate',
         'checkState':Globals.server+'State/checkState',
         'getStateByCountry':Globals.server+'State/checkCountrybystate',

//district
         'addcity':Globals.server+'city/addcity',
         'getcity':Globals.server+'city/getcity',
         'updatecity':Globals.server+'city/updatecity',
         'getcityid':Globals.server+'city/getcitybyid',
         'deletecity':Globals.server+'city/deletecity',
         'checkCity':Globals.server+'city/checkCity',
         'getCityByState':Globals.server+'city/checkcitybystate',

        //  //village
        //  'addVillage':Globals.server+'villege/addvillege',
        //  'getVillage':Globals.server+'villege/getvillege',
        //  'updateVillage':Globals.server+'villege/updatevillege/',
        //  'deleteVillage':Globals.server+'villege/deletevillege',
        //   //village


    //village
    'addVillage':Globals.server+'villege/addvillege',
    'getVillage':Globals.server+'villege/getvillege',
    'updateVillage':Globals.server+'villege/updatevillege',
    'deleteVillage':Globals.server+'villege/deletevillege',
    'checkVillage':Globals.server+'villege/checkvillege',
    'getVillageByCity':Globals.server+'villege/checkvillegebycity',





     //distributor
     'addDistributor':Globals.server+'master/adddistributor',
     'getDistributor':Globals.server+'master/getdistributor',
     'updateDistributor':Globals.server+'master/updatedistributor',
     'deleteDistributor':Globals.server+'master/deletedistributor',
     'getDistributorByid':Globals.server+'master/getdistributorbyid',


 //Mandi master
 'addMandi':Globals.server+'agrioutputmaster/addagrioutputmandi',
 'getMandi':Globals.server+'agrioutputmaster/getagrioutputmandi',
 'updateMandi':Globals.server+'agrioutputmaster/updateagrioutputmandi',
 'deleteMandi':Globals.server+'agrioutputmaster/deleteagrioutputmandi',
 'getMandiss':Globals.server+'agrioutputmaster/getagrioutputmandibyid',
 'getMandiByLanguage':Globals.server+'agrioutputmaster/getMandiByLanguage',



 //Produce measuring unit
 'addUnit':Globals.server+'producemeasure/addproduceunit',
 'getUnit':Globals.server+'producemeasure/getproduceunit',
 'updateUnit':Globals.server+'producemeasure/updateproduceunit',
 'deleteUnit':Globals.server+'producemeasure/deleteproduceunit',
 'getUnitByid':Globals.server+'producemeasure/getproduceunitbyid',


 //Member ship api
 'addMembership':Globals.server+'master/addMemberOrganizationType',
 'getMembership':Globals.server+'master/getMemberOrganizationType',
 'updateMembership':Globals.server+'master/updateMemberOrganizationType',
 'deleteMembership':Globals.server+'master/deleteMemberOrganizationType',
 'getMembershipByid':Globals.server+'master/getMemberOrganizationTypebyid',


  //bank api
  'addBank':Globals.server+'bankmaster/addbank',
  'getBank':Globals.server+'bankmaster/getbank',
  'updateBank':Globals.server+'bankmaster/updatebank',
  'deleteBank':Globals.server+'bankmaster/deletebank',
  'getBankByid':Globals.server+'bankmaster/getbankbyid',
  'getBankByIfsc':Globals.server+'bankmaster/getbankbyifsc',

 //irrigation api
 'addIrrigation':Globals.server+'master/irrigation',
 'getaddIrrigation':Globals.server+'master/getirrigation',
 'updateaddIrrigation':Globals.server+'master/updateirrigation',
 'deleteaddIrrigation':Globals.server+'master/deleteirrigation',
 'getIrrigationByid':Globals.server+'master/getIrrigationByid',


  //livestock api
  'addLivestock':Globals.server+'farmer/saveLiveStock',
  'getLivestocks':Globals.server+'farmer/getLiveStock',
  'updateLivestock':Globals.server+'farmer/updateLiveStock',
  'deleteLivestock':Globals.server+'farmer/deleteLiveStocks',
  'getLivestockByid':Globals.server+'farmer/getLivestockByid',

    //mandirate master api
    'addMandimaster':Globals.server+'mandimaster/addmandirate',
    'getMandimaster':Globals.server+'mandimaster/getmandirate',
    'updateMandimaster':Globals.server+'mandimaster/updatemandirate',
    'deleteMandimaster':Globals.server+'mandimaster/deletemandirate',
    'getMandimasterss':Globals.server+'mandimaster/getmandirate',


    //farmer
    'getfamer':Globals.server+'api/get-farmer',
    'getFarmerById':Globals.server+'api/get-farmerById',

//appointment
    'getAppointment':Globals.server+'agrioutputmaster/getAppointment',
    'getAppointmentById':Globals.server+'agrioutputmaster/getAppointmentByID',
    'getAppointmentByCount':Globals.server+'agrioutputmaster/getappointMentValue',
    //language
    'language':Globals.server+'master/language',
    'languageByID':Globals.server+'master/languageByID',
    'checkLanguage':Globals.server+'master/checkLanguage',
    'getDisrictByPincode':Globals.server+'farmer/pinNo',

//kissanmitra

 'addKissanMitra':Globals.server+'kisanmitra/addkissanmitra',
 'getKissanMitra':Globals.server+'kisanmitra/getkisanmitra',
 'updateKissanMitra':Globals.server+'kisanmitra/addkisanmitraidtofarmer',
 'deleteKissanMitra':Globals.server+'kisanmitra/deleteKissanmitra',




 'mapKissanMitra':Globals.server+'kisanmitra/mapkisanmitra',
 'getkisanmitrabypincode':Globals.server+'kisanmitra/getkisanmitrabypincode',
 'getvillageandrefrelcode':Globals.server+'kisanmitra/getvillageandrefrelcode',
//  'checkrefrelcodebyvillage':Globals.server+'kisanmitra/getrefrelcodebehalfofvillage',
 'getkisanmitrabyvillage':Globals.server+'kisanmitra/getrefrelcodebehalfofvillage',
 'getstateanddistrict':Globals.server+'kisanmitra/getstateanddistrict',
 'Registerqruser':Globals.server+'login/qruser',
 'getRegisterqruser':Globals.server+'login/getqrusers',
 "getpricebycitizentype":Globals.server+'badge/getbadgebycitizentype',
 "gettickettypebyid":Globals.server+'ticket/gettickettypebyid',
 "addbadge":Globals.server+'badge/addbadge',
 "getpricebyid":Globals.server+'ticket/getpricebyid',
 "addpaymnet":Globals.server+'badge/addbadge',
 "getBadgeByMobile":Globals.server+'badge/getBadgeByMobile',
 "paynow":Globals.server+'badge/paynow',
 "gettotalticket":Globals.server+'badge/gettotalticket',
 "gettotalscanneduser":Globals.server+'badge/gettotalscanneduser',
 "getbuissnesdaycount":Globals.server+'badge/getbuisnessdaybooking',
 "getnonbuissnesdaycount":Globals.server+'badge/getnonbuisnessdaybooking',
 "gettotalscaneeduserdata":Globals.server+'badge/gettotalscaneeduserdata',
 "gettotalscaneeduserdatainadmin":Globals.server+'badge/gettotalscaneeduserdatainadmin',
 "gettotalpayment":Globals.server+'badge/gettotalpayment',
 'getdetailbyurnnombers':Globals.server+'badge/getbadgebyurnnumber',

};

}
export class Purchase{
  public static readonly server = environment.serverUrl;
  public static readonly route = {

      'upload': Purchase.server + 'upload',
      'productCategory':Purchase.server+'agriinputmaster/productCategory',
      'productCategoryByID':Purchase.server+'agriinputmaster/getproductcategoriesbyid',
      'productSubCategory':Purchase.server+'agriinputmaster/productSubCategory',
      'getsubproductcategorybyid':Purchase.server+'agriinputmaster/getsubproductcategorybyid',
      'taxRate':Purchase.server+'agriinputmaster/taxRate',
      'taxRateByID':Purchase.server+'agriinputmaster/getTaxById',
      'checkTaxCode':Purchase.server+'agriinputmaster/checkTaxCode',
      'brand':Purchase.server+'agriinputmaster/brand',
      'brandByID':Purchase.server+'agriinputmaster/brandByID',
      'checkBrandCode':Purchase.server+'agriinputmaster/checkBrandCode',
      'unit':Purchase.server+'agriinputmaster/unit',
      'unitByID':Purchase.server+'agriinputmaster/unitByID',
      'checkUnitCode':Purchase.server+'agriinputmaster/checkUnitCode',
      'Registerqruser':Globals.server+'login/qruser',
      
};

}
