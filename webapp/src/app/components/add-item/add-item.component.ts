import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class AddItemComponent {
  item = {
    itemid: '',
    description: '',
    location: '',
    tag: '',
    dateLost: '',
    status: 'lost',
    autofill: false,
    contact: '',
    additionalContact: '',
    images: [] as string[]  // store base64 images
  };

  imagePreviews: string[] = []; // for displaying previews

  constructor(private itemService: ItemService) {}

  // Called when user selects images
  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      Array.from(target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          this.item.images.push(base64.split(',')[1]); // remove prefix "data:image/png;base64,"
          this.imagePreviews.push(base64); // for preview
        };
        reader.readAsDataURL(file);
      });
    }
  }

  addItem() {
    console.log('Item added', this.item);
    this.itemService.addItem(this.item).subscribe(() => {
      alert('Item added successfully!');
      this.resetForm();
    });
  }

  resetForm() {
    this.item = {
      itemid: '',
      description: '',
      location: '',
      tag: '',
      dateLost: '',
      status: 'lost',
      autofill: false,
      contact: '',
      additionalContact: '',
      images: []
    };
    this.imagePreviews = [];
  }
}
