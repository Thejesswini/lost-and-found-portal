
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.item && this.item._id) {
      this.itemId = this.item._id;
      this.itemData = { ...this.item };
      this.imagePreviews = this.item.images ? [...this.item.images] : [];

      // Format dateLost to yyyy-mm-dd for input
      if (this.itemData.dateLost) {
        const d = new Date(this.itemData.dateLost);
        this.itemData.dateLost = d.toISOString().substring(0, 10);
      }
    }
  }

  // ✅ Simple autofill function
  toggleAutofill() {
    if (this.itemData.autofill) {
      // Replace these values with the actual user's contact info
      this.itemData.contact = '9999999999';         
      this.itemData.additionalContact = '8888888888';
    } else {
      this.itemData.contact = '';
      this.itemData.additionalContact = '';
    }
  }

  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.selectedImages = Array.from(target.files);
      this.selectedImages.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
        reader.readAsDataURL(file);
      });
    }
  }

  updateItem() {
    const formData = new FormData();
    formData.append('description', this.itemData.description);
    formData.append('location', this.itemData.location);
    formData.append('tag', this.itemData.tag);
    formData.append('dateLost', this.itemData.dateLost);
    formData.append('status', this.itemData.status);
    formData.append('autofill', this.itemData.autofill.toString());
    formData.append('contact', this.itemData.contact);
    formData.append('additionalContact', this.itemData.additionalContact);

    this.selectedImages.forEach(file => formData.append('images', file));

    this.http.put(`http://localhost:3000/api/items/${this.itemId}`, formData).subscribe({
      next: (res) => {
        alert('Item updated successfully!');
        this.close.emit(); 
      },
      error: (err) => {
        console.error(err);
        alert('Error updating item.');
      }
    });
  }

  cancelUpdate() {
    this.close.emit();
  }
}
