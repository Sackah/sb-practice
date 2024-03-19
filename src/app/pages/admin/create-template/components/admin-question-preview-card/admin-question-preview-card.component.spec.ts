import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionPreviewCardComponent } from './admin-question-preview-card.component';

describe('AdminQuestionPreviewCardComponent', () => {
  let component: AdminQuestionPreviewCardComponent;
  let fixture: ComponentFixture<AdminQuestionPreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuestionPreviewCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminQuestionPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
