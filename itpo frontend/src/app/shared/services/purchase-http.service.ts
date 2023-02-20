import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Globals, Purchase } from './global.constant';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHttpService {
  Registerqruser: any;
  getRegisterqruser() {
    throw new Error('Method not implemented.');
  }
  getLanguage() {
    throw new Error('Method not implemented.');
  }
  constructor(private httpService: HttpClient) { }

upload(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  const request = new HttpRequest(
    'POST',
    Purchase.route.upload,
    formData,
    {
      reportProgress: false,
      responseType: 'text',
    }
  );

  return this.httpService.request(request);
}




addProductCategory(formData:FormData){
  return this.httpService.post(Purchase.route.productCategory,formData)
}
getProductCategory(){
  return this.httpService.get(Purchase.route.productCategory)
}
deleteProductCategory(id:any){
  return this.httpService.delete(`${Purchase.route.productCategory}/${id}`)
}
getProductCategoryById(id:any){
  return this.httpService.get(`${Purchase.route.productCategoryByID}/${id}`)
}
updateProductCategory(id:any,formData:FormData){
  return this.httpService.put(`${Purchase.route.productCategory}/${id}`,formData)
}

addProductSubCategory(formData:FormData){
  return this.httpService.post(Purchase.route.productSubCategory,formData)
}
getProductSubCategory(){
  return this.httpService.get(Purchase.route.productSubCategory)
}
deleteProductSubCategory(id:any){
  return this.httpService.delete(`${Purchase.route.productSubCategory}/${id}`)
}
getProductSubCategoryById(id:any){
  return this.httpService.get(`${Purchase.route.getsubproductcategorybyid}/${id}`)
}


updateProductSubCategory(id:any,formData:FormData){
  return this.httpService.put(`${Purchase.route.productSubCategory}/${id}`,formData)
}
getTaxRate(){
  return this.httpService.get(Purchase.route.taxRate)
}

 addTaxRate(formData:FormData){
  return this.httpService.post(`${Purchase.route.taxRate}`,formData)
 }
deleteTaxRate(id:any){
  return this.httpService.delete(`${Purchase.route.taxRate}/${id}`)
}
updateTaxRate(id:any,formData:FormData){
  return this.httpService.put(`${Purchase.route.taxRate}/${id}`,formData)
 }
getTaxRateById(id:any){
  return this.httpService.get(`${Purchase.route.taxRateByID}/${id}`)
}
checkTaxCode(taxCode:any){
  return this.httpService.get(`${Purchase.route.checkTaxCode}/${taxCode}`)
}

//brand Master

addBrand(formdata:FormData){
  return this.httpService.post(Purchase.route.brand,formdata)
}
getBrand(){
  return this.httpService.get(Purchase.route.brand)
}
getBrandByID(id:any){
  return this.httpService.get(`${Purchase.route.brandByID}/${id}`)
}
deleteBrandByID(id:any){
  return this.httpService.delete(`${Purchase.route.brand}/${id}`)
}
updateBrand(id:any,formData:FormData){
  return this.httpService.put(`${Purchase.route.brand}/${id}`,formData)
}

checkBrandCode(brandCode:any){
  return this.httpService.get(`${Purchase.route.checkBrandCode}/${brandCode}`)
}
//Unit


addUnit(formdata:FormData){
  return this.httpService.post(Purchase.route.unit,formdata)
}
getUnit(){
  return this.httpService.get(Purchase.route.unit)
}
getUnitByID(id:any){
  return this.httpService.get(`${Purchase.route.unitByID}/${id}`)
}
deleteUnit(id:any){
  return this.httpService.delete(`${Purchase.route.unit}/${id}`)
}
updateUnit(id:any,formData:FormData){
  return this.httpService.put(`${Purchase.route.unit}/${id}`,formData)
}

checkUnitCode(unitCode:any){
  return this.httpService.get(`${Purchase.route.checkUnitCode}/${unitCode}`)
}


}
