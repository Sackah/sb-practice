import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionPreviewClassicComponent } from './admin-question-preview-classic.component';

describe('AdminQuestionPreviewClassicComponent', () => {
  let component: AdminQuestionPreviewClassicComponent;
  let fixture: ComponentFixture<AdminQuestionPreviewClassicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuestionPreviewClassicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminQuestionPreviewClassicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
