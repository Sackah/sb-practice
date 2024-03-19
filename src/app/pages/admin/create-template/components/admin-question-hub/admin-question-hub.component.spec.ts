import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionHubComponent } from './admin-question-hub.component';

describe('AdminQuestionHubComponent', () => {
  let component: AdminQuestionHubComponent;
  let fixture: ComponentFixture<AdminQuestionHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuestionHubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminQuestionHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
