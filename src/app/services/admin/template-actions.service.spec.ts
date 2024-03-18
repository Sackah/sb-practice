import { TestBed } from '@angular/core/testing';

import { TemplateActionsService } from './template-actions.service';

describe('TemplateActionsService', () => {
  let service: TemplateActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
