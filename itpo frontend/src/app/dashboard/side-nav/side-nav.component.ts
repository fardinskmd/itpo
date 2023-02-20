import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  username: any;

  constructor(private router: Router) { }
  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('category');
    localStorage.removeItem('user');
    localStorage.removeItem('userdata');
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.username= localStorage.getItem('name')?localStorage.getItem('name'):this.router.navigate(['/'])
  };

  
  // bookinglist(){
  //   this.router.navigate('booking-list');
  // }
}
