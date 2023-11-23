import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicpotsComponent } from './publicpots.component';

describe('PublicpotsComponent', () => {
  let component: PublicpotsComponent;
  let fixture: ComponentFixture<PublicpotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicpotsComponent]
    });
    fixture = TestBed.createComponent(PublicpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
