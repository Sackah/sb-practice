import { TestBed } from '@angular/core/testing';

import { SaveTemplateTriggerService } from './save-template-trigger.service';

describe('SaveTemplateTriggerService', () => {
  let service: SaveTemplateTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveTemplateTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
