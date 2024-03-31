import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionPreviewComponent } from './admin-question-preview.component';

describe('AdminQuestionPreviewComponent', () => {
  let component: AdminQuestionPreviewComponent;
  let fixture: ComponentFixture<AdminQuestionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuestionPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminQuestionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
