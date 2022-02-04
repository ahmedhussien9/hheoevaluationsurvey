import { TestBed } from '@angular/core/testing';

import { HttpSubmitSurveyService } from './http-survey.service';

describe('HttpSubmitSurveyService', () => {
  let service: HttpSubmitSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpSubmitSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
