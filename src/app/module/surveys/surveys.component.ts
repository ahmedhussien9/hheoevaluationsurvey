import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs/internal/Observable';
import { merge } from 'rxjs/internal/observable/merge';
import { tap } from 'rxjs/internal/operators/tap';
import { ListOfSurveysDataSource } from './classes/surveys-list.datasource';
import { HttpSurveysService } from './services/http-surveys.service';
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
  providers: [HttpSurveysService],
})
export class SurveysComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'website', 'detail'];
  dataSource: ListOfSurveysDataSource;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  resultsLength: Observable<number>;

  constructor(private httpSurveyService: HttpSurveysService) {}

  ngOnInit(): void {
    this.dataSource = new ListOfSurveysDataSource(this.httpSurveyService);
    this.refresh();
  }

  refresh(page: number = 0) {
    this.dataSource.loadData(page);
    this.resultsLength = this.dataSource.mata$;
  }

  ngAfterViewInit() {
    // reset the paginator after sorting
    merge(this.paginator.page)
      .pipe(
        tap(() => {
          this.refresh(this.paginator.pageIndex);
        })
      )
      .subscribe();
  }
}
