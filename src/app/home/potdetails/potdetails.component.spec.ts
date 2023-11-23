import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotdetailsComponent } from './potdetails.component';

describe('PotdetailsComponent', () => {
  let component: PotdetailsComponent;
  let fixture: ComponentFixture<PotdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PotdetailsComponent]
    });
    fixture = TestBed.createComponent(PotdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
