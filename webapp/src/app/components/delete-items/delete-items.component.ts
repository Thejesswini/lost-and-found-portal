import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-items.component.html',
  styleUrls: ['./delete-items.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DeleteItemComponent {
  @Input() itemId: string = ''; // 👈 For inline delete
  @Input() showInput: boolean = false; // 👈 To optionally show manual input

  constructor(private http: HttpClient) {}

  deleteItem() {
    const idToDelete = this.itemId.trim();

    if (!idToDelete) {
      alert('Please enter or provide a valid Item ID');
      return;
    }

    if (confirm('Are you sure you want to delete this item?')) {
      this.http.delete(`http://localhost:3000/api/items/${idToDelete}`).subscribe({
        next: (res) => {
          console.log('✅ Item deleted:', res);
          alert('Item deleted successfully!');
          if (this.showInput) this.itemId = ''; // reset if used standalone
        },
        error: (err) => {
          console.error('❌ Error deleting item:', err);
          alert('Error deleting item. Make sure the Item ID is correct.');
        }
      });
    }
  }
}
