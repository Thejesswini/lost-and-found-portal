import { Component } from '@angular/core';
import { AddItemComponent } from '../add-item/add-item.component';
import { ViewItemsComponent } from '../view-items/view-items.component';

@Component({
  selector: 'app-home',
  imports: [AddItemComponent, ViewItemsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class Home {

}
