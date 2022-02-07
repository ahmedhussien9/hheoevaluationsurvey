import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs/internal/Observable';
import { merge } from 'rxjs/internal/observable/merge';
import { tap } from 'rxjs/internal/operators/tap';
import { ListOfSurveysDataSource } from './classes/surveys-list.datasource';
import { ISurveyStatus } from './interfaces/ISurveryFilter.interface';
import { SurveyStatusModel } from './models/SurveyStatus.model';
import { HttpSurveysService } from './services/http-surveys.service';
import { TFormStatus } from './types/TFormStatus.type';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveysComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'website', 'detail'];
  dataSource: ListOfSurveysDataSource;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  resultsLength: Observable<number>;
  surveryStatusModel: SurveyStatusModel;

  constructor(
    private httpSurveyService: HttpSurveysService,
    private cd: ChangeDetectorRef
  ) {
    this.surveryStatusModel = new SurveyStatusModel();
  }

  ngOnInit(): void {
    this.dataSource = new ListOfSurveysDataSource(this.httpSurveyService);
    this.refresh();
  }

  selectedStatus(status: ISurveyStatus) {
    this.surveryStatusModel.select(status);
    this.refresh(this.paginator.pageIndex, status.value);
    this.cd.detectChanges();
  }

  refresh(
    page: number = 0,
    formStatus:
      | TFormStatus.completed
      | TFormStatus.canceled
      | TFormStatus.drafted
      | TFormStatus.inProgress = TFormStatus.completed
  ) {
    this.dataSource.loadData(page, formStatus);
    this.resultsLength = this.dataSource.mata$;
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        tap(() => {
          this.refresh(this.paginator.pageIndex);
          this.cd.detectChanges();
        })
      )
      .subscribe();
  }
}
