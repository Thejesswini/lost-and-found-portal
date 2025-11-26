import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule]
})
export class UpdateItemComponent implements OnInit {
  @Input() item: any;          
  @Output() close = new EventEmitter<void>(); 

  itemId: string = '';
  itemData = {
    description: '',
    location: '',
    tag: '',
    dateLost: '',
    status: 'lost',
    autofill: false,
    contact: '',
    additionalContact: '',
    images: [] as string[]
  };

  selectedImages: File[] = [];
  imagePreviews: string[] = [];
  tags: any[] = [];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    if (this.item && this.item._id) {
      this.itemId = this.item._id;
      this.itemData = {
      description: this.item.description,
      location: this.item.location,
      tag: this.item.tag,
      dateLost: this.item.dateLost,
      status: this.item.status,
      autofill: this.item.autofill,
      contact: this.item.contact,
      additionalContact: this.item.additionalContact,
      images: []   // don't load existing images as base64
    };

    // Previews can display base64 but never send them
    this.imagePreviews = [...this.item.images];

    this.fetchTags();
  }

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

  

  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
  
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  
    this.selectedImages = [];
    this.imagePreviews = [];
  
    for (const file of Array.from(target.files)) {
  
      if (!validTypes.includes(file.type)) {
        target.value = '';
        this.snackBar.open('Only image files allowed.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        return;
      }
  
      this.selectedImages.push(file);
  
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
      reader.readAsDataURL(file);
    }
  }
  

  updateItem() {
    if (
      !this.itemData.description.trim() || 
      !this.itemData.location.trim() || 
      !this.itemData.contact.trim()
    ) {
      this.snackBar.open('Description, Location, and Contact cannot be empty', 'Close', {
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
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
  }
    const formData = new FormData();
    formData.append('description', this.itemData.description);
    formData.append('location', this.itemData.location);
    formData.append('tag', this.itemData.tag);
    formData.append('dateLost', this.itemData.dateLost);
    formData.append('status', this.itemData.status);
    formData.append('autofill', this.itemData.autofill.toString());
    formData.append('contact', this.itemData.contact);
    formData.append('additionalContact', this.itemData.additionalContact);

  //   this.selectedImages.forEach(file => formData.append('images', file));

  //   this.http.put(`http://localhost:3000/items/${this.itemId}`, formData).subscribe({
  //     next: (res) => {
  //       console.log('Item updated:', res);
  //       alert('Item updated successfully!');
  //       window.location.reload();
  //       this.close.emit(); 
  //     },
  //     error: (err) => {
  //       console.error('Error updating item:', err);
  //       alert('Error updating item.');
  //     }
  //   });
  // }
  this.selectedImages.forEach(file => {
    formData.append('images', file);
  });

  this.http.put(`http://localhost:3000/items/${this.itemId}`, formData)
    .subscribe({
      next: res => {
        Swal.fire({
          title: 'Success!',
          text: 'Item updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          // 2. ONLY run this code after the user clicks "OK"
          if (result.isConfirmed) {
            window.location.reload(); 
              this.close.emit();
          }
        });
       
      },
      error: err => {
        console.error(err);
        alert("Update failed");
      }
    });
}

  cancelUpdate() {
    this.close.emit(); 
  }
}