import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
 

  constructor(private router: Router) {
    console.log('welcome Page')
   }

  ngOnInit(): void {
  }
  bookticket(){
    this.router.navigate(['add-ticket'])
  }

}
