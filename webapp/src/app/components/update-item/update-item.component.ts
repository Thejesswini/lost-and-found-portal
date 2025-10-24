import { Component, OnInit, Input } from '@angular/core';
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
  @Input() item: any; // 👈 added for inline usage
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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // If used inside view-items (inline)
    if (this.item && this.item._id) {
      this.itemId = this.item._id;
      this.itemData = { ...this.item };
      this.imagePreviews = this.item.images ? [...this.item.images] : [];
    } else {
      // If accessed via route (edit page)
      const routeId = this.route.snapshot.paramMap.get('id');
      if (routeId) {
        this.itemId = routeId;
        this.loadItem();
      }
    }
  }

  loadItem() {
    this.http.get<any>(`http://localhost:3000/api/items/${this.itemId}`).subscribe({
      next: (res) => {
        this.itemData = { ...res };
        if (res.images) this.imagePreviews = [...res.images];
      },
      error: (err) => console.error('❌ Error loading item:', err)
    });
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
        console.log('✅ Item updated:', res);
        alert('Item updated successfully!');
        this.router.navigate(['/']); // refresh or redirect
      },
      error: (err) => {
        console.error('❌ Error updating item:', err);
        alert('Error updating item.');
      }
    });
  }
}
