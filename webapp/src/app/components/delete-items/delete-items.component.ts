import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

    Swal.fire({
      title: 'Are you sure?',
      text: "Selected item will be deleted",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5daaf3ff',
      cancelButtonColor: 'rgba(221, 71, 51, 1)',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/items/${idToDelete}`).subscribe({
        next: (res) => {
          
          window.location.reload();
              if (this.showInput) this.itemId = ''; 
              console.log('Item deleted:', res);
        },
        error: (err) => {
          console.error('Error deleting item:', err);
          alert('Error deleting item. Make sure the Item ID is correct.');
        }
      });
      }
    });
  }
}
