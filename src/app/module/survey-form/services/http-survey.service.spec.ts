import { fakeAsync, inject, TestBed } from '@angular/core/testing';

import { HttpSubmitSurveyService, IFormId } from './http-survey.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs';

describe('HttpSubmitSurveyService', () => {
  let service: HttpSubmitSurveyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpSubmitSurveyService);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should test initialize API', fakeAsync(
    inject([HttpSubmitSurveyService], (service: HttpSubmitSurveyService) => {
      let mockInitialize = {
        id: 64,
        uuid: '80ef2d0e-2b8b-4c5f-85d4-ec5f9e9b9d0a',
      };
      service
        .getFormInitializeApi()
        .pipe(
          map((data: any) => {
            return {
              id: data['id'],
              uuid: data['uuid'],
            };
          }),
          tap((data: IFormId) => {
            service.setToLocalStorage(data);
          })
        )
        .subscribe((data) => {
          // console.log(data);
          //

        });
    })
  ));

  it('it should test localstorage prfix', fakeAsync(
    inject([HttpSubmitSurveyService], (service: HttpSubmitSurveyService) => {})
  ));
});
