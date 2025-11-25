import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ViewItemsComponent {
  items: any[] = [];
  tags: any[] = [];
  selectedTag: string = "All";

  constructor(
    private itemService: ItemService, 
    private http: HttpClient,
    private router: Router) {}

  ngOnInit() {
    this.loadItems();
    this.loadTags();
  }

  loadItems() {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data.map(item => ({ ...item, currentImageIndex: 0 }));
        console.log('Items loaded:', this.items);
      },
      error: (err) => console.error('Error loading items:', err)
    });
  }

  loadTags() {
    this.http.get<any[]>('http://localhost:3000/tags').subscribe({
      next: (tags) => {
        this.tags = tags;
        console.log("Tags loaded:", tags);
      },
      error: (err) => console.error("Error loading tags:", err)
    });
  }

  onTagSelected() {
    if (this.selectedTag === "All") {
      this.loadItems();
      return;
    }

    this.http.get<any[]>(`http://localhost:3000/items/search/${this.selectedTag}`).subscribe({
      next: (data) => {
        this.items = data.map(item => ({ ...item, currentImageIndex: 0 }));
        console.log("Filtered Items:", this.items);
      },
      error: (err) => console.error("Error filtering items:", err)
    });
  }

  prevImage(item: any) {
    if (item.currentImageIndex === 0) {
      item.currentImageIndex = item.images.length - 1;
    } else {
      item.currentImageIndex--;
    }
  }

  nextImage(item: any) {
    if (item.currentImageIndex === item.images.length - 1) {
      item.currentImageIndex = 0;
    } else {
      item.currentImageIndex++;
    }
  }

  goToDetails(id: string){
    this.router.navigate(['/item',id]);
  }
}