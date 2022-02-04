import { TestBed } from '@angular/core/testing';

import { HttpSurveysService } from './http-surveys.service';

describe('HttpSurveysService', () => {
  let service: HttpSurveysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpSurveysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
