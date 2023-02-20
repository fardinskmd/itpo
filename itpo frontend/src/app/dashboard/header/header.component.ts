import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  localdata: any;
  constructor(
    private router: Router,
    // private toast: ToasterService,
    private AuthS: HttpService,
    private formB: FormBuilder,
  ) { }
  name: any;
  appForm!: FormGroup;
  isPasswordSame: any;
  login_id: any;
  isValidFormSubmitted: any;
  udata: any;
  email: any;
  applicantSdata: any;
  private _id: any;
  Udata: any;

  ngOnInit(): void {
    this.name = localStorage.getItem('name')
    ? localStorage.getItem('name')
    : this.router.navigate(['/']);
  this.Udata = localStorage.getItem('userdata');
  let uddd = JSON.parse(this.Udata);

  this.applicantSdata = JSON.parse(this.Udata);
  this.onforminit();
  }


  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('category');
    localStorage.removeItem('user');
    localStorage.removeItem('userdata');
    this.router.navigate(['/']);
  }

  onforminit() {
    this.appForm = this.formB.group(
      {
        old_pass: ['', [Validators.required]],
        new_pass: ['', Validators.compose([Validators.required])],
        c_pass: ['', [Validators.required]],
      },
      { validators: this.checkPassword('new_pass', 'c_pass') }
    );
  }
  checkPassword(controlName: any, matchingControlName: any) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      // if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      //   // return if another validator has already found an error on the matchingControl
      //   return;
      // }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        this.isPasswordSame = matchingControl.status == 'VALID' ? true : false;
      } else {
        matchingControl.setErrors(null);
        this.isPasswordSame = matchingControl.status == 'VALID' ? true : false;
      }
    };
  }

  changeSubmit(): void {
    this.isValidFormSubmitted = false;

    if (this.appForm.invalid) {
      this.isValidFormSubmitted = true;
      console.log(this.appForm, 'error');
    } else {
      console.log(this.appForm, 'true');
      this.AuthS.ChangePassword(
        this.appForm.value,
        this.applicantSdata._id
      ).subscribe((data: any) => {
        console.log('saved');
        if (data.status == 200) {
          // this.toast.showSuccess(data.message);
          window.location.reload();
          document.getElementById('closemodal')?.click();
          this.logout();
          window.location.href = '/';
        } else {
          // this.toast.showError(data.message);
        }
      });
    }
  }

  public get f() {
    return this.appForm.controls;
  }
}
