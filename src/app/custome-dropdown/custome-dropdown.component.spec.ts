import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeDropdownComponent } from './custome-dropdown.component';

describe('CustomeDropdownComponent', () => {
  let component: CustomeDropdownComponent;
  let fixture: ComponentFixture<CustomeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
