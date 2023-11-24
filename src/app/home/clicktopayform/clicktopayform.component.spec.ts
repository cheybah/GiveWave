import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClicktopayformComponent } from './clicktopayform.component';

describe('ClicktopayformComponent', () => {
  let component: ClicktopayformComponent;
  let fixture: ComponentFixture<ClicktopayformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClicktopayformComponent]
    });
    fixture = TestBed.createComponent(ClicktopayformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
