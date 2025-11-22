import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-items.component.html',
  styleUrls: ['./delete-items.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DeleteItemComponent {
  @Input() itemId: string = ''; 
  @Input() showInput: boolean = false; 

  constructor(private http: HttpClient,private router: Router) {}

  deleteItem() {
    const idToDelete = this.itemId.trim();

    if (!idToDelete) {
      alert('Please enter or provide a valid Item ID');
      return;
    }

    if (confirm('Are you sure you want to delete this item?')) {
      this.http.delete(`http://localhost:3000/items/${idToDelete}`).subscribe({
        next: (res) => {
          console.log('Item deleted:', res);
          alert('Item deleted successfully!');
          this.router.navigate(['/']);
          window.location.reload();
          if (this.showInput) this.itemId = ''; 
        },
        error: (err) => {
          console.error('Error deleting item:', err);
          alert('Error deleting item. Make sure the Item ID is correct.');
        }
      });
    }
  }
}
