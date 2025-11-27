import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { inject } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class Header {

  router = inject(Router);

  goToProfile() {
    this.router.navigate(['/user-profile']);
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5daaf3ff',
      cancelButtonColor: 'rgba(221, 71, 51, 1)',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();      // remove token
        this.router.navigate(['/login']);
      }
    });
  }
}
