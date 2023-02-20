import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-booking-list',
  templateUrl: './ticket-booking-list.component.html',
  styleUrls: ['./ticket-booking-list.component.css']
})
export class TicketBookingListComponent implements OnInit {

  getData: any;
  getValue:any;
  getkissanmitra:any
  distributor!: FormGroup;
  submitted!: false;




  title = 'datatables';
  dtTrigger:any = new Subject<any>();
  dtOptions: any = {};
  id: any;

  constructor(private httpService:HttpService,
    private fb: FormBuilder,
    private router: Router,) { 
      this.distributor=this.fb.group({
     
        kisanMitraId:['',],
   
          }) 
    
  }
  
  edit=(data:any)=>{
    this.id=data._id

   
 
   
    }

  // onSubmit() {
  //   if(this.distributor.valid){
  //     this.httpService.updateKissanMitra(this.id,this.distributor.value).subscribe((data: any) => {
    
  //       this.distributor.reset()
  //       Swal.fire('Distributor Added Successfully!', '', 'success')
  //       window.location.reload()
  //     }, err => {
  //       Swal.fire('Distributor Not Added Successfully!', 'error')
    
  //     })
  //   }
   
    
    
  //     }

      onSubmit(){
        if(this.distributor.valid){

          this.httpService.updateKissanMitra(this.id,this.distributor.value).subscribe(data=>{
            Swal.fire('Kissan mitra Added With Farmer!', '', 'success')
            // this.router.navigate([`/dashboard/sell/master/crop`])
            location.reload()
          },err=>{
            Swal.fire('Kissan mitra not Added With Farmer!', '', 'error')
          })
        }
        else{
          Swal.fire('Please Fill Required Field!', '', 'error')
        }
      }


  name = 'Export to CSV';



  download() {
    let fileName = 'User.csv';
    let columnNames = ["Name","Aadhar No","Village","Created At","Mobile No", "FarmerUniqueId", "Gender","HighestEducation","Category","Email","PinCode","Future Crop Name","Future Crop Category Name","House Hold Income","Farm Income","Land Area","Farad No"];
    let header = columnNames.join(',');

    let csv = header;
    csv += '\r\n';

    this.getData.map((c:any,userData:any) => {
      csv += [c["name"], c["adhaarNo"], c["village"],c["createdAt"],c["mobileNo"],c["farmerUniqueId"],c["gender"],c["highestEducation"],c?.userData[0]?.category,c?.userData[0]?.email,c["pincode"],c?.crop_futuresData[0]?.crop_name,c?.crop_futuresData[0]?.category_name,c?.incomeData[0]?.household_income,c?.landData[0]?.land_area,c?.landData[0]?.farad_no].join(',');
      csv += '\r\n';
    })

    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }



  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      dom: 'Blfrtip',
        buttons: [
            'copy','print'
        ]
    };
    
    // this.state=this.fb.group({
    //   country:['',],
    //   state:['',],


    // })
    this.httpService.gettotalscaneeduserdatainadmin().subscribe((data: any) => {
      console.log(data);
      this.getData = data?.Data;
      this.dtTrigger.next();
    });


    this.httpService.getProfileCount().subscribe((data: any) => {
      console.log(data,"Hello");
      this.getValue = data?.Data;

    });



    console.log(this.getValue);

  }


}
