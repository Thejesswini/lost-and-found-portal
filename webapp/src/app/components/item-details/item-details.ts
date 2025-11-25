import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.html',
  styleUrls: ['./item-details.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ItemDetailsComponent implements OnInit {
  itemId: string = '';
  item: any = null;
  currentImageIndex = 0;

  constructor(private route: ActivatedRoute, private itemService: ItemService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id') || '';
      if (this.itemId) this.loadItemDetails();
    });
  }

  loadItemDetails() {
    this.itemService.getItemById(this.itemId).subscribe({
      next: (data) => {
        this.item = data;
        console.log('Item details loaded:', this.item);
      },
      error: (err) => console.error('Error loading item details:', err)
    });
  }

  prevImage() {
    if (!this.item?.images?.length) return;
    this.currentImageIndex = this.currentImageIndex === 0
      ? this.item.images.length - 1
      : this.currentImageIndex - 1;
  }

  nextImage() {
    if (!this.item?.images?.length) return;
    this.currentImageIndex = this.currentImageIndex === this.item.images.length - 1
      ? 0
      : this.currentImageIndex + 1;
  }
}
