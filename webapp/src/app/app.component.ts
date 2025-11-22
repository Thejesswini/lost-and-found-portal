import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { DeleteItemComponent } from './components/delete-items/delete-items.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, AddItemComponent, ViewItemsComponent, UpdateItemComponent, DeleteItemComponent, RouterOutlet, Header]
})
export class App {
  protected readonly title = signal('webapp');

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
