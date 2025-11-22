import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class Login {
  formbuilder = inject(FormBuilder);
  logForm = this.formbuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required]]
  });

  authService = inject(Auth);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  login(){
    let value = this.logForm.value;
    this.authService.login(value.email!, value.password!).subscribe({

      next:(result:any)=>{
      // alert("user logged in! Welcome to Lost and Found Portal");
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));
    console.log("token is:", localStorage.getItem("token"));
    this.router.navigateByUrl("/");
      },
      error: (err)=>{
        let errorMessage = "Invalid username or password.";

        this.snackBar.open(errorMessage, "Close", {
          duration: 5000, // Keep error messages on screen a bit longer
          panelClass: ['error-snackbar'] // Optional: A class for custom styling
        });
      }
    });
  }
}
