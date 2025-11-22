import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class Header {

  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/user-profile']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
