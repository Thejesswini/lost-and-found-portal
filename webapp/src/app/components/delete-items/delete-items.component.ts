import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-items.component.html',
  styleUrls: ['./delete-items.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DeleteItemComponent {
  itemId: string = '';

  constructor(private http: HttpClient) {}

  deleteItem() {
    if (!this.itemId) {
      alert('Please enter an Item ID');
      return;
    }

    this.http.delete(`http://localhost:3000/api/items/${this.itemId}`).subscribe({
      next: (res) => {
        console.log('✅ Item deleted:', res);
        alert('Item deleted successfully!');
        this.itemId = '';
      },
      error: (err) => {
        console.error('❌ Error deleting item:', err);
        alert('Error deleting item. Make sure the Item ID is correct.');
      }
    });
  }
}
