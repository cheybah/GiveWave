import { TestBed } from '@angular/core/testing';

import { ContributorService } from './contributor.service';

describe('ContributorService', () => {
  let service: ContributorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContributorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
