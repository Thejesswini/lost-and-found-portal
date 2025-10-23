import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService]
    });

    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update an item', () => {
    const dummyItem = { description: 'Updated' };
    const itemId = '123';

    service.updateItem(itemId, dummyItem).subscribe((res) => {
      expect(res).toEqual(dummyItem);
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/items/${itemId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyItem); // Mock response
  });

  it('should delete an item', () => {
    const itemId = '123';

    service.deleteItem(itemId).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/items/${itemId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}); // Mock response
  });
});
