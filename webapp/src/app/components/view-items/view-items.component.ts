import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
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

  constructor(
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit() {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data.map(item => ({ ...item, currentImageIndex: 0 }));
        console.log('Items loaded:', this.items);
      },
      error: (err) => console.error('Error loading items:', err)
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

  // 👉 NEW FUNCTION
  goToDetails(id: string) {
    this.router.navigate(['/item', id]);
  }
}
