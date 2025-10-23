import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { UpdateItemComponent } from '../update-item/update-item.component';
import { DeleteItemComponent } from '../delete-items/delete-items.component';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UpdateItemComponent,
    DeleteItemComponent
  ]
})
export class ViewItemsComponent {
  items: any[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data;
        console.log('Items loaded:', this.items);
      },
      error: (err) => console.error('Error loading items:', err)
    });
  }
}
