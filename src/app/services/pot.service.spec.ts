import { TestBed } from '@angular/core/testing';

import { PotService } from './pot.service';

describe('PotService', () => {
  let service: PotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
