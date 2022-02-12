import { TestBed } from '@angular/core/testing';

import { HttpSurveyDetailService } from './http-survey-detail.service';

describe('HttpSurveyDetailService', () => {
  let service: HttpSurveyDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpSurveyDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
