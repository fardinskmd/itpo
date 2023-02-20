import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/shared/services/http.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checkoutForm!: FormGroup;

  public active: boolean = false;

  public display: boolean = false;
  public displaypassword: boolean = false;
  public displayotp: boolean = false;
  captcha: any;
  captchaError: any;
  date:any= new Date()

  constructor(
    private fb: FormBuilder,
    private auth: HttpService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    setInterval(() => {
      this.date = new Date()
      this.date = formatDate(new Date(), 'dd-MM-yyyy', 'en');
    }, 5000);
  }

  SubmitLogin(): void {
    // this.spinner.show();
    if (this.checkoutForm.valid) {

        this.auth.loginUser(this.checkoutForm.value).subscribe((user: any) => {
          console.log(user);

          if (user.status === 200) {
            console.log(user.results.category);
            if (user.results.category === 'ro') {
              if (user.results.status === true) {
                localStorage.setItem('name', user.results.name);
                localStorage.setItem('category', user.results.category);
                localStorage.setItem('user', user.results.email);
                localStorage.setItem('userdata', JSON.stringify(user.results));
                setTimeout(() => {
                  // this.router.navigate(['/bashboard']);
                  console.log('RO login');
                }, 1500);
              } else {
                setTimeout(() => {
                  // this.toast.showError(
                  //   'Oops! E-mail is not activated. Kindly check your e-mail to activate your account.'
                  // );
                  // this.router.navigate(['/login']);
                  this.spinner.hide();
                  window.location.href = '/login';
                }, 1500);
              }
            }

            else {
              localStorage.setItem('name', user.results.name);
              localStorage.setItem('user', user.results.email);
              localStorage.setItem('category', user.results.designation);
              localStorage.setItem('userdata', JSON.stringify(user.results));
              setTimeout(() => {
                // this.router.navigate(['/']);
                window.location.href = '/dashboard';
                console.log('Super Admin');
              }, 1500);
              this.router.navigate(['/dashboard']);
            }
          } else if (user.status === 404) {
            // this.toast.showError('Oops! Credentials entered are not valid!');
            this.spinner.hide();
          }
          if (user.status === 401) {
            // this.toast.showError('Oops! Credentials entered are not valid!');
            this.spinner.hide();
          }
        },err=>{
          console.log(err)
          Swal.fire(err?.error?.message, '', 'error')
        });
     
     
    } else {
      // this.toast.showError('Oops! Please enter Credentials !');
      // this.spinner.hide();
    }
  }


  SubmitOtp(): void {
    this.auth
      .VerifyEmail(this.checkoutForm.value)
      .subscribe((response: any) => {
        if (response.status === 200) {
          console.log(response);
          localStorage.setItem('name', response.results[0].name);
          localStorage.setItem('user', response.results[0].email);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        } else {
          // this.toast.showError(response.message);
        }
      });
  }


  CheckEmail(usertype: any): void {
    this.checkoutForm.valid
      ? this.auth.CheckEmail(this.checkoutForm.value).subscribe((user: any) => {
          if (user.status === 200) {
            // this.toast.showSuccess(user.message);
            setTimeout(() => {
              this.display = true;
              this.active = true;
              // if (usertype == 'otp') {
              //   this.auth
              //     .SendEmail(this.checkoutForm.value)
              //     .subscribe((data: any) => {
              //       if (data.status == 200) {
              //         this.toast.showSuccess(data.message);
              //         this.displayotp = true;
              //       } else {
              //         this.toast.showError(data.message);
              //         this.displayotp = false;
              //       }
              //     });
              // } else
              if (usertype == 'password') {
                this.displaypassword = true;
              }
            }, 1500);
            // alert(user.message)
          } else if (user.status === 404) {
            // this.toast.showError(user.message);
          }
          if (user.status === 401) {
            // this.toast.showError(user.message);
          }
        }):'';
      // : this.toast.showError('Oops! Credentials entered are not valid!');
  }


  ngOnInit(): void {
    localStorage.removeItem('name');
    localStorage.removeItem('category');
    localStorage.removeItem('user');
    localStorage.removeItem('userdata');
    this.forminit();
    // this.spinner.hide();
  }

  forminit() {
    this.checkoutForm = this.fb.group({
      email: [
        '',
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ],
      password: [''],
    });
  }

  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
    this.captchaError = '';
  }


}
