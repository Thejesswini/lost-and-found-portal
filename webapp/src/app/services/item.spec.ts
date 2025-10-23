import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/api/items';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService]
    });

    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensures no open requests remain
  });

  // CREATE
  it('should add a new item', () => {
    const dummyItem = { description: 'New item' };

    service.addItem(dummyItem).subscribe((res) => {
      expect(res).toEqual(dummyItem);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(dummyItem); // mock response
  });

  // READ
  it('should get all items', () => {
    const dummyItems = [
      { description: 'Item 1' },
      { description: 'Item 2' }
    ];

    service.getItems().subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(dummyItems);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyItems); // mock response
  });

  // UPDATE
  it('should update an item', () => {
    const dummyItem = { description: 'Updated item' };
    const itemId = '123';

    service.updateItem(itemId, dummyItem).subscribe((res) => {
      expect(res).toEqual(dummyItem);
    });

    const req = httpMock.expectOne(`${baseUrl}/${itemId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyItem);
  });

  // DELETE
  it('should delete an item', () => {
    const itemId = '123';

    service.deleteItem(itemId).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(`${baseUrl}/${itemId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
