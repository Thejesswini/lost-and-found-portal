import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteItemComponent } from './delete-items.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('DeleteItemComponent', () => {
  let component: DeleteItemComponent;
  let fixture: ComponentFixture<DeleteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteItemComponent, HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call delete API if itemId is empty', () => {
    spyOn(window, 'alert');
    component.itemId = '';
    component.deleteItem();
    expect(window.alert).toHaveBeenCalledWith('Please enter an Item ID');
  });
});
