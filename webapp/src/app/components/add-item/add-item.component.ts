import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule]
})
export class AddItemComponent implements OnInit{

  tags: any[] = [];

  item = {
    
    description: '',
    location: '',
    tag: 'water bottle',
    dateLost: '',
    status: 'lost',
    autofill: false,
    contact: '',
    additionalContact: ''
  };

  selectedImages: File[] = [];
  imagePreviews: string[] = [];

  constructor(
    private http: HttpClient, 
    private router: Router,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchTags();
  }

  fetchTags() {
    this.http.get('http://localhost:3000/tags').subscribe({
      next: (data: any) => {
        this.tags = data; // Store the backend response in our array
        console.log('Tags loaded:', this.tags);
      },
      error: (err) => {
        console.error('Error fetching tags:', err);
      }
    });
  }
  
  handleAutofill() {
    if (this.item.autofill) {
      const email = this.getUserEmailFromToken();
      if (email) {
        this.item.contact = email;
      }
    } else {
      this.item.contact = "";
    }
  }

  getUserEmailFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email || null;
    } catch (err) {
      console.error("Error decoding token", err);
      return null;
    }
  }

  // Handle file selection
  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
  
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  
    this.selectedImages = [];
    this.imagePreviews = [];
  
    Array.from(target.files).forEach(file => {
      if (!validTypes.includes(file.type)) {
        this.snackBar.open('Only image files (PNG, JPG, JPEG, WEBP) are allowed.', 'Close', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
        return;
      }
  
      this.selectedImages.push(file);
  
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
      reader.readAsDataURL(file);
    });
  }

 
  addItem() {
    if (
      !this.item.description.trim() || 
      !this.item.location.trim() || 
      !this.item.contact.trim()
    ) {
      this.snackBar.open('Please fill in Description, Location, and Contact', 'Close', {
        duration: 5000, 
        panelClass: ['error-snackbar'] // Optional: You can style this class in global styles
      });
      return;
    }

    // 2. NEW: Check for Future Date
  if (this.item.dateLost) {
    const selectedDate = new Date(this.item.dateLost);
    const today = new Date();

    // specific check: if selectedDate is strictly greater than now
    if (selectedDate > today) {
      this.snackBar.open('Date lost/found cannot be in the future', 'Retry', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return; // Stop execution
    }
  }

    const formData = new FormData();
    
    formData.append('description', this.item.description);
    formData.append('location', this.item.location);
    formData.append('tag', this.item.tag);
    formData.append('dateLost', this.item.dateLost);
    formData.append('status', this.item.status);
    formData.append('autofill', this.item.autofill.toString());
    formData.append('contact', this.item.contact);
    formData.append('additionalContact', this.item.additionalContact);

   
    this.selectedImages.forEach(file => {
      formData.append('images', file); 
    });

    console.log('Uploading item with formData:', formData);

    this.http.post('http://localhost:3000/items', formData).subscribe({
      next: (res) => {
        console.log('Item added:', res);
        Swal.fire({
          title: 'Success!',
          text: 'Item added successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          // 2. ONLY run this code after the user clicks "OK"
          if (result.isConfirmed) {
            window.location.reload(); 
          }
        });
      },
      error: (err) => {
        console.error('Error adding item:', err);
        console.log("check add-item.component.ts");
        alert('Error adding item.');
      }
    });
  }

  resetForm() {
    this.item = {
      
      description: '',
      location: '',
      tag: '',
      dateLost: '',
      status: 'lost',
      autofill: false,
      contact: '',
      additionalContact: ''
    };
    this.selectedImages = [];
    this.imagePreviews = [];
  }
}
