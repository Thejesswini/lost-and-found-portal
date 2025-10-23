import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient) {}

  
  addItem(item: any): Observable<any> {
    return this.http.post(this.baseUrl, item);
  }

  // Update an item by ID
  updateItem(itemId: string, updatedItem: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${itemId}`, updatedItem);
  }

  // Delete an item by ID
  deleteItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${itemId}`);
  }

  // Optional: Get all items (if you need to display them)
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
