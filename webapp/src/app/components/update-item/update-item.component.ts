import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  itemId: string = '';
  item = {
    description: '',
    location: '',
    tag: '',
    dateLost: '',
    status: 'lost',
    autofill: false,
    contact: '',
    additionalContact: '',
    images: [] as string[] // store URLs of existing images
  };

  selectedImages: File[] = [];
  imagePreviews: string[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id')!;
    this.loadItem();
  }

  loadItem() {
    this.http.get<any>(`http://localhost:3000/api/items/${this.itemId}`).subscribe({
      next: (res) => {
        this.item = { ...res };
        // show existing images as previews
        if (res.images) this.imagePreviews = [...res.images];
      },
      error: (err) => console.error('❌ Error loading item:', err)
    });
  }

  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.selectedImages = Array.from(target.files);

      // Add new image previews
      this.selectedImages.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
        reader.readAsDataURL(file);
      });
    }
  }

  updateItem() {
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

    // Append new image files
    this.selectedImages.forEach(file => formData.append('images', file));

    console.log('Updating item with formData:', formData);

    this.http.put(`http://localhost:3000/api/items/${this.itemId}`, formData).subscribe({
      next: (res) => {
        console.log('✅ Item updated:', res);
        alert('Item updated successfully!');
        this.router.navigate(['/items']); // redirect to list page
      },
      error: (err) => {
        console.error('❌ Error updating item:', err);
        alert('Error updating item.');
      }
    });
  }
}
