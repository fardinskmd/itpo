import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-header',
  templateUrl: './welcome-header.component.html',
  styleUrls: ['./welcome-header.component.css']
})
export class WelcomeHeaderComponent implements OnInit {
  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  aboutus() {
    this.router.navigate(['about-us'])
  }
  contactus(){
    this.router.navigate(['contact-us'])
  }
  privacypolicy(){
    this.router.navigate(['privacypolicy'])
  }
  termsandconditions(){
    this.router.navigate(['terms-and-conditions'])
  }
  Product(){
    this.router.navigate([''])
  }
  refundcancellation(){
    this.router.navigate(['refund-cancellation'])
  }
  login(){
    this.router.navigate(['auth/login'])
  }

}
