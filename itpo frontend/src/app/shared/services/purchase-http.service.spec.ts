import { TestBed } from '@angular/core/testing';

import { PurchaseHttpService } from './purchase-http.service';

describe('PurchaseHttpService', () => {
  let service: PurchaseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
