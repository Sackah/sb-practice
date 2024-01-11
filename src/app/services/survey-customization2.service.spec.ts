import { TestBed } from '@angular/core/testing';

import { SurveyCustomization2Service } from './survey-customization2.service';

describe('SurveyCustomization2Service', () => {
  let service: SurveyCustomization2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyCustomization2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
