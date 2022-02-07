import { Component, OnInit } from '@angular/core';
import { ISurvey } from '../../interfaces/ISurvey.interface';
import { HttpSurveysService } from '../../services/http-surveys.service';
import { Location } from '@angular/common';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  survey: ISurvey = this.httpSurveysService.surveyDetail;
  faArrowCircleLeft = faArrowCircleLeft;
  constructor(
    private httpSurveysService: HttpSurveysService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  back() {
    this.location.back();
  }
}
