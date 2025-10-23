import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { DeleteItemComponent } from './components/delete-items/delete-items.component';
import { provideHttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, UpdateItemComponent, DeleteItemComponent]
})
export class App {}
