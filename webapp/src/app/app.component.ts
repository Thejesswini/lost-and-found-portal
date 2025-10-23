import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { DeleteItemComponent } from './components/delete-items/delete-items.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { provideHttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, AddItemComponent, ViewItemsComponent, UpdateItemComponent, DeleteItemComponent]
})
export class App {}
