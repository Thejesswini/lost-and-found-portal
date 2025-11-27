import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UpdateItemComponent } from '../update-item/update-item.component';
import { DeleteItemComponent } from '../delete-items/delete-items.component';

@Component({
  selector: 'app-user-profile',
  imports: [
    CommonModule,
    UpdateItemComponent,
    DeleteItemComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  user: any = null;
  items: any[] = [];
  loading = true;

  showUpdateModal = false;
  selectedItem: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log("User profile component loaded");

    this.http.get("http://localhost:3000/user/me").subscribe({
      next: (res: any) => {
        this.user = res;

        //fetch posts
        this.fetchUserItems(res._id);

        this.loading = false;
      },
      error: (err) => {
        console.error("Profile load error:", err);
        this.loading = false;
      }
    });
  }

  //Fetch items created by this user
  fetchUserItems(userId: string) {
    this.http.get(`http://localhost:3000/items/${userId}`).subscribe({
      next: (res: any) => {
        console.log("User items:", res);

        //index tracking for each item's images
        this.items = res.map((item: any) => ({
          ...item,
          currentImageIndex: 0
        }));
      },
      error: (err) => {
        console.error("Error loading user items:", err);
      }
    });
  }

  nextImage(item: any) {
    if (!item.images || item.images.length <= 1) return;
    item.currentImageIndex = (item.currentImageIndex + 1) % item.images.length;
  }

  prevImage(item: any) {
    if (!item.images || item.images.length <= 1) return;
    item.currentImageIndex =
      (item.currentImageIndex - 1 + item.images.length) % item.images.length;
  }

  
  openUpdateModal(item: any) {
    this.selectedItem = item;
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
    this.selectedItem = null;
  }
}
