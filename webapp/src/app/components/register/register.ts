import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  formbuilder = inject(FormBuilder);
  authService = inject(Auth);
  router = inject(Router);
  snackbar = inject(MatSnackBar);

  regForm = this.formbuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  register() {
    console.log("Register function triggered");

    if (this.regForm.invalid) {
      // Check for specific validation errors
      const emailControl = this.regForm.get('email');
      const passwordControl = this.regForm.get('password');

      if (emailControl?.hasError('email') || emailControl?.hasError('required')) {
        this.snackbar.open('Please enter a valid email address', 'Close', { duration: 3000 });
        return;
      }

      if (passwordControl?.hasError('minlength')) {
        const minLength = passwordControl.errors?.['minlength'].requiredLength;
        this.snackbar.open(`Password must be at least ${minLength} characters long`, 'Close', { duration: 3000 });
        return;
      }

      if (passwordControl?.hasError('required')) {
        this.snackbar.open('Password is required', 'Close', { duration: 3000 });
        return;
      }

    }

    const value = this.regForm.value;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value.email!)) {
      this.snackbar.open('Please enter a valid email address', 'Close', { duration: 3000 });
      return;
    }
    
    // Call backend to check if email already exists
    this.authService.checkEmailExists(value.email!).subscribe({
      next: (exists) => {
        if (exists) {
          this.snackbar.open('Email already registered!', 'Close', { duration: 3000 });
        } else {
          this.authService.register(value.name!, value.email!, value.password!).subscribe({
            next: (result:any) => {
              localStorage.setItem("token", result.token);
              localStorage.setItem("user", JSON.stringify(result.user));
              this.router.navigateByUrl("/");
              this.snackbar.open('User registered! Welcome to LostAndFound', 'Close', { duration: 3000 });
              
            },
            error: (err) => {
              this.snackbar.open(`Registration failed: ${err.error.message || 'Try again later'}`, 'Close', { duration: 3000 });
            }
          });
        }
      },
      error: () => {
        this.snackbar.open('Error checking email. Try again later.', 'Close', { duration: 3000 });
      }
    });
  }
}
