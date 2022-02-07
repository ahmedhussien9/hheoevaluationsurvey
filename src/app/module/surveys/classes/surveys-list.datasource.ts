import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { first } from 'rxjs/internal/operators/first';
import { catchError } from 'rxjs/internal/operators/catchError';
import { finalize } from 'rxjs/internal/operators/finalize';
import { of } from 'rxjs/internal/observable/of';
import { HttpSurveysService } from '../services/http-surveys.service';
import { TFormStatus } from '../types/TFormStatus.type';

@Injectable({
  providedIn: 'root',
})
export class ListOfSurveysDataSource implements DataSource<any> {
  public dataSubjectSurveysService = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private metaSubject = new BehaviorSubject<any>({});
  public mata$ = this.metaSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  empty = false;

  constructor(private httpSurveysService: HttpSurveysService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.dataSubjectSurveysService.pipe(
      tap((data) => {
        this.empty = !data.length;
      })
    );
  }
  disconnect(): void {
    this.dataSubjectSurveysService.complete();
    this.loadingSubject.complete();
    this.dataSubjectSurveysService.unsubscribe();
    this.loadingSubject.unsubscribe();
  }

  loadData(
    page: number,
    formStatus:
      | TFormStatus.completed
      | TFormStatus.canceled
      | TFormStatus.drafted
      | TFormStatus.inProgress
  ) {
    this.loadingSubject.next(true);
    this.httpSurveysService
      .getListOfSurveysApi(page, formStatus)
      .pipe(
        first(),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((data: any) => {
        this.dataSubjectSurveysService.next(data.content);
        this.metaSubject.next(data.totalElements);
      });
  }
}
