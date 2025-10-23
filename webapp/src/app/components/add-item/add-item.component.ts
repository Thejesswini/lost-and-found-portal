import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AddItemComponent {
  item = {
    
    description: '',
    location: '',
    tag: '',
    dateLost: '',
    status: 'lost',
    autofill: false,
    contact: '',
    additionalContact: ''
  };

  selectedImages: File[] = [];
  imagePreviews: string[] = [];

  constructor(private http: HttpClient) {}

  // Handle file selection
  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.selectedImages = Array.from(target.files);
      this.imagePreviews = [];

      this.selectedImages.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
        reader.readAsDataURL(file);
      });
    }
  }

  // Submit form
  addItem() {
    const formData = new FormData();

    // Append text fields
    
    formData.append('description', this.item.description);
    formData.append('location', this.item.location);
    formData.append('tag', this.item.tag);
    formData.append('dateLost', this.item.dateLost);
    formData.append('status', this.item.status);
    formData.append('autofill', this.item.autofill.toString());
    formData.append('contact', this.item.contact);
    formData.append('additionalContact', this.item.additionalContact);

    // Append image files
    this.selectedImages.forEach(file => {
      formData.append('images', file); // ⚠️ key must match backend: upload.array('images')
    });

    console.log('Uploading item with formData:', formData);

    this.http.post('http://localhost:3000/api/items', formData).subscribe({
      next: (res) => {
        console.log('✅ Item added:', res);
        alert('Item added successfully!');
        this.resetForm();
      },
      error: (err) => {
        console.error('❌ Error adding item:', err);
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
