import { fakeAsync, inject, TestBed } from '@angular/core/testing';

import { HttpSubmitSurveyService } from './http-survey.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('HttpSubmitSurveyService', () => {
  let service: HttpSubmitSurveyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(HttpSubmitSurveyService);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return articles from the API via GET', fakeAsync(
    inject([HttpSubmitSurveyService], (service: HttpSubmitSurveyService) => {})
  ));
});
