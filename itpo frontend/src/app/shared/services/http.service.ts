import { Injectable } from '@angular/core';

import { HttpClient, HttpEvent, HttpRequest, HttpParams, HttpHeaders } from "@angular/common/http";
import { Globals } from './global.constant';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  [x: string]: any;
  getCropss: any;
  addCrops: any;
  getCrops() {
    throw new Error('Method not implemented.');
  }
  checkBank(value: any) {
    throw new Error('Method not implemented.');
  }
  checkbanks(value: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private httpService: HttpClient) { }


  loginUser(data: any) {
    return this.httpService.post(Globals.route.login, data)
}

Registerqruser(data: any) {
  return this.httpService.post(Globals.route.Registerqruser, data)
}

getRegisterqruser(){
  return this.httpService.get(Globals.route.getRegisterqruser)

}


  VerifyEmail(data: any) {
    return this.httpService.post(Globals.route['verify-otp'], data)

  }
  CheckEmail(email: any) {
    return this.httpService.post(Globals.route.checkemail, email)

  }

  ChangePassword(data: any, id: any) {

    return this.httpService.post(`${Globals.route['change-password']}/${id}`, data)

  }



  getCropType(){
    return this.httpService.get(Globals.route.cropType)

  }
addCrop(formdata:FormData){
 return this.httpService.post(Globals.route.addCrop,formdata)
}
upload(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  const request = new HttpRequest(
    'POST',
    Globals.route.upload,
    formData,
    {
      reportProgress: false,
      responseType: 'text',
    }
  );

  return this.httpService.request(request);
}

getCrop(){
  return this.httpService.get(Globals.route.getCrop)
}

getUser(){
  return this.httpService.get(Globals.route.getUser)
}
getUserCount(){
  return this.httpService.get(Globals.route.getUserCount)
}
deleteCrop(id:any){
  return this.httpService.delete(`${Globals.route.deleteCrop}/${id}`)
}
updateCrop(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateCrop}/${id}`,formData)
}
getCropByID(id:any){
  return this.httpService.get(`${Globals.route.getCropById}/${id}`)
}

getProfileCount(){
  return this.httpService.get(Globals.route.getProfileCount)
}

getappCount(){
  return this.httpService.get(Globals.route.getappCount)
}






addVariety(formdata:FormData){
  return this.httpService.post(Globals.route.addVariety,formdata)
 }

 getVariety(){
  return this.httpService.get(Globals.route.getVariety)
}

getVarietybyid(id:any){
  return this.httpService.get(`${Globals.route.getVarietybyid}/${id}`)
}
getVarietyByLanguage(language:any){
  return this.httpService.get(`${Globals.route.getVarietyByLanguage}/${language}`)
}

updateVariety(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateVariety}/${id}`,formData)
}
deleteVariety(id:any){
  return this.httpService.delete(`${Globals.route.deleteVariety}/${id}`)
}

addcroptype(formdata:FormData){
  return this.httpService.post(Globals.route.addcroptype,formdata)
 }

 getcroptype(){
  return this.httpService.get(Globals.route.getcroptype)
 }


//  getCropTypeByLanguage(id:any){
//   return this.httpService.get(Globals.route.getCropTypeByLanguage,formdata)
//  }
 getCropTypeByLanguage(language:any){
  return this.httpService.get(`${Globals.route.getCropTypeByLanguage}/${language}`)
}

 getCroptypebyid(id:any){
  return this.httpService.get(`${Globals.route.getCroptypebyid}/${id}`)
}
deleteCropType(id:any){
  return this.httpService.delete(`${Globals.route.deleteCropType}/${id}`)
}
updateCropType(id:any,formData:FormData){
  return this.httpService.put(`${Globals.route.updateCropType}/${id}`,formData)
}


//ADD COUNTRY API

addCountry(formdata:FormData){
  return this.httpService.post(Globals.route.addCountry,formdata)
 }

 getCountry(){
  return this.httpService.get(Globals.route.getCountry)
 }

 checkCountry(formdata:any){
  return this.httpService.post(Globals.route.checkCountry,formdata)
 }


 updateCountry(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateCountry}/${id}`,formData)
}


getCountrybyid(id:any){
  return this.httpService.get(`${Globals.route.getCountrybyid}/${id}`)
}



deleteCountry(id:any){
  return this.httpService.delete(`${Globals.route.deleteCountry}/${id}`)
}

//state service

//ADD state API

addState(formdata:FormData){
  return this.httpService.post(Globals.route.addState,formdata)
 }

 getState(){
  return this.httpService.get(Globals.route.getState)
 }


 updateState(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateState}/${id}`,formData)
}


getStatebyid(id:any){
  return this.httpService.get(`${Globals.route.getStatebyid}/${id}`)
}



deleteState(id:any){
  return this.httpService.delete(`${Globals.route.deleteState}/${id}`)
}



//

checkState(formdata:any){
  return this.httpService.post(Globals.route.checkState,formdata)
 }

 getStateByCountry(formData:any){
  return this.httpService.post(Globals.route.getStateByCountry,formData)
 }

 //District


addCity(formdata:FormData){
  return this.httpService.post(Globals.route.addcity,formdata)
 }

 getCity(){
  return this.httpService.get(Globals.route.getcity)
 }


 updateCity(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updatecity}/${id}`,formData)
}


getCityByid(id:any){
  return this.httpService.get(`${Globals.route.getcityid}/${id}`)
}



deleteCity(id:any){
  return this.httpService.delete(`${Globals.route.deletecity}/${id}`)
}



//

checkCity(formdata:any){
  return this.httpService.post(Globals.route.checkCity,formdata)
 }
 getCityByState(formdata:any){
  return this.httpService.post(Globals.route.getCityByState,formdata)
 }


 //village
 addVillage(formData:any){
  return this.httpService.post(Globals.route.addVillage,formData)
 }

 getVillage(){
  return this.httpService.get(Globals.route.getVillage)
 }
 updateVillage(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateVillage}/${id}`,formData)
}
checkVillage(formData:any){
  return this.httpService.post(Globals.route.checkVillage,formData)
}
deleteVillage(id:any){
  return this.httpService.delete(`${Globals.route.deleteVillage}/${id}`)
}
getvillageByCity(formData:any){
  return this.httpService.post(Globals.route.getVillageByCity,formData)
}
//distributor section


addDistributor(formdata:FormData){
  return this.httpService.post(Globals.route.addDistributor,formdata)
 }

 getDistributor(){
  return this.httpService.get(Globals.route.getDistributor)
 }


 updateDistributor(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateDistributor}/${id}`,formData)
}


deleteDistributor(id:any){
  return this.httpService.delete(`${Globals.route.deleteDistributor}/${id}`)
}

//Mandi section


addMandi(formdata:FormData){
  return this.httpService.post(Globals.route.addMandi,formdata)
 }

 getMandi(){
  return this.httpService.get(Globals.route.getMandi)
 }


 updateMandi(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateMandi}/${id}`,formData)
}


deleteMandi(id:any){
  return this.httpService.delete(`${Globals.route.deleteMandi}/${id}`)
}

getMandiByLanguage(language:any){
  return this.httpService.get(`${Globals.route.getMandiByLanguage}/${language}`)
}

getMandiss(id:any){
  return this.httpService.get(`${Globals.route.getMandiss}/${id}`)
}


//unit Section


addUnit(formdata:FormData){
  return this.httpService.post(Globals.route.addUnit,formdata)
 }

 getUnit(){
  return this.httpService.get(Globals.route.getUnit)
 }


 updateUnit(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateUnit}/${id}`,formData)
}


deleteUnit(id:any){
  return this.httpService.delete(`${Globals.route.deleteUnit}/${id}`)
}


getUnitByid(id:any){
  return this.httpService.get(`${Globals.route.getUnitByid}/${id}`)
}

//Membership Section


addMembership(formdata:FormData){
  return this.httpService.post(Globals.route.addMembership,formdata)
 }

 getMembership(){
  return this.httpService.get(Globals.route.getMembership)
 }


 updateMembership(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateMembership}/${id}`,formData)
}


deleteMembership(id:any){
  return this.httpService.delete(`${Globals.route.deleteMembership}/${id}`)
}


getMembershipByid(id:any){
  return this.httpService.get(`${Globals.route.getUnitByid}/${id}`)
}

//irrigation section
//Membership Section


addIrrigation(formdata:FormData){
  return this.httpService.post(Globals.route.addIrrigation,formdata)
 }

 getaddIrrigation(){
  return this.httpService.get(Globals.route.getaddIrrigation)
 }


 updateaddIrrigation(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateaddIrrigation}/${id}`,formData)
}


deleteaddIrrigation(id:any){
  return this.httpService.delete(`${Globals.route.deleteaddIrrigation}/${id}`)
}


getIrrigationByid(id:any){
  return this.httpService.get(`${Globals.route.getIrrigationByid}/${id}`)
}


//bank Section


addBank(formdata:FormData){
  return this.httpService.post(Globals.route.addBank,formdata)
 }

 getBank(){
  return this.httpService.get(Globals.route.getBank)
 }


 updateBank(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateBank}/${id}`,formData)
}


deleteBank(id:any){
  return this.httpService.delete(`${Globals.route.deleteBank}/${id}`)
}


getBankByid(id:any){
  return this.httpService.get(`${Globals.route.getBankByid}/${id}`)
}

getBankByIfsc(id:any){
  return this.httpService.get(`${Globals.route.getBankByIfsc}/${id}`)
}

///Farmer Profile
getFarmerAll() {
  return this.httpService.get(Globals.route.getfamer)
}

getFarmerById(id:any) {

  return this.httpService.get(`${Globals.route.getFarmerById}/${id}`);
}


//livestock profile

addLivestock(formdata:FormData){
  return this.httpService.post(Globals.route.addLivestock,formdata)
 }

 getLivestocks(){
  return this.httpService.get(Globals.route.getLivestocks)
 }


 updateLivestock(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateLivestock}/${id}`,formData)
}


deleteLivestock(id:any){
  return this.httpService.delete(`${Globals.route.deleteLivestock}/${id}`)
}


getLivestockByid(id:any){
  return this.httpService.get(`${Globals.route.getLivestockByid}/${id}`)
}


//Appointment

getAppointment(){
  return this.httpService.get(Globals.route.getAppointment)
}
getAppointmentByID(id:any){
  return this.httpService.get(`${Globals.route.getAppointmentById}/${id}`)
}



//Mandimaster profile

addMandimaster(formdata:FormData){
  return this.httpService.post(Globals.route.addMandimaster,formdata)
 }

 getMandimaster(){
  return this.httpService.get(Globals.route.getMandimaster)
 }


 updateMandimaster(id:any,formData:any){
  return this.httpService.put(`${Globals.route.updateMandimaster}/${id}`,formData)
}


deleteMandimaster(id:any){
  return this.httpService.delete(`${Globals.route.deleteMandimaster}/${id}`)
}


getMandimasterss(id:any){
  return this.httpService.get(`${Globals.route.getMandimasterss}/${id}`)
}

//language

addLanguage(formdata:FormData){
  return this.httpService.post(Globals.route.language,formdata)
 }

 getLanguage(){
  return this.httpService.get(Globals.route.language)
 }


 updateLanguage(id:any,formData:any){
  return this.httpService.put(`${Globals.route.language}/${id}`,formData)
}


deleteLanguage(id:any){
  return this.httpService.delete(`${Globals.route.language}/${id}`)
}


languageByID(id:any){
  return this.httpService.get(`${Globals.route.languageByID}/${id}`)
}
checkLanguage(language:any){
  return this.httpService.get(`${Globals.route.checkLanguage}/${language}`)
}

getDisrictByPincode(pinCode:any){
  return this.httpService.get(`${Globals.route.getDisrictByPincode}/${pinCode}`)
}
getAppointmentByCount(){

  return this.httpService.get(Globals.route.getAppointmentByCount)
}

//kissnmitra

addKissanMitra(formdata:FormData){
  return this.httpService.post(Globals.route.addKissanMitra,formdata)
 }


 getKissanMitra(){

  return this.httpService.get(Globals.route.getKissanMitra)
}

updateKissanMitra(id:any,formData:any){
  // return this.httpService.post(Globals.route.updateKissanMitra,formdata)
  return this.httpService.post(`${Globals.route.updateKissanMitra}/${id}`,formData)
 }

 deleteKissanMitra(id:any){
  return this.httpService.delete(`${Globals.route.deleteKissanMitra}/${id}`)
}


mapKissanMitra(formdata:FormData){
  return this.httpService.post(Globals.route.mapKissanMitra,formdata)
 }



 getkisanmitrabyvillage(formData:any){
  return this.httpService.post(Globals.route.getkisanmitrabyvillage,formData)
 }

 getstateanddistrict(formData:any){
  return this.httpService.post(Globals.route.getstateanddistrict,formData)
 }


 getvillageandrefrelcode(){

  return this.httpService.get(Globals.route.getvillageandrefrelcode)
}


//get
getpricebycitizentype(formData:any){
  // return this.httpService.post(Globals.route.updateKissanMitra,formdata)
  return this.httpService.post(Globals.route.getpricebycitizentype,formData)
 }

 getpricebyid(formData:any){

  return this.httpService.post(Globals.route.getpricebyid,formData)
 }
 gettickettypebyid(id:any){
  return this.httpService.get(`${Globals.route.gettickettypebyid}/${id}`)
}


getdetailbyurnnombers(urnno:any){
  return this.httpService.get(`${Globals.route.getdetailbyurnnombers}/${urnno}`)
}

addbadge(formdata:FormData){
  return this.httpService.post(Globals.route.addbadge,formdata)
 }

 addpaymnet(formdata:any){
  return this.httpService.post(Globals.route.addpaymnet,formdata)
 }
 getBadgeByMobile(mobile:any){
  return this.httpService.get(`${Globals.route.getBadgeByMobile}/${mobile}`)
 }
 payNow(data:any){
  return this.httpService.post(Globals.route.paynow,data)
 }


 gettotalticket(){

  return this.httpService.get(Globals.route.gettotalticket)
}

gettotalscanneduser(){

  return this.httpService.get(Globals.route.gettotalscanneduser)
}


getbuissnesdaycount(){

  return this.httpService.get(Globals.route.getbuissnesdaycount)
}

getnonbuissnesdaycount(){

  return this.httpService.get(Globals.route.getnonbuissnesdaycount)
}
gettotalscaneeduserdata(){

  return this.httpService.get(Globals.route.gettotalscaneeduserdata)
}
gettotalscaneeduserdatainadmin(){

  return this.httpService.get(Globals.route.gettotalscaneeduserdatainadmin)
}


gettotalpayment(){
return this.httpService.get(Globals.route.gettotalpayment)
}



}








