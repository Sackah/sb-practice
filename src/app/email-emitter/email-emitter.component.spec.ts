import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEmitterComponent } from './email-emitter.component';

describe('EmailEmitterComponent', () => {
  let component: EmailEmitterComponent;
  let fixture: ComponentFixture<EmailEmitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailEmitterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailEmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
