import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowitworksComponent } from './howitworks.component';

describe('HowitworksComponent', () => {
  let component: HowitworksComponent;
  let fixture: ComponentFixture<HowitworksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HowitworksComponent]
    });
    fixture = TestBed.createComponent(HowitworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
