import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = 'http://localhost:3000/items';

  constructor(private http: HttpClient) {}

  addItem(item: any): Observable<any> {
    return this.http.post(this.baseUrl, item);
  }

  updateItem(itemId: string, updatedItem: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${itemId}`, updatedItem);
  }

  deleteItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${itemId}`);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  

  // Get a single item by ID
  // Get a single item by ID
  getItemById(itemId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/id/${itemId}`);
}


}
