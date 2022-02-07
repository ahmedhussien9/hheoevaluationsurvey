import { ISurveyStatus } from '../interfaces/ISurveryFilter.interface';
import { SURVEY_STATUS_DATA } from '../surveyStatus.data';

export class SurveyStatusModel {
  public statusData: ISurveyStatus[] = SURVEY_STATUS_DATA;
  public selected: ISurveyStatus = this.surveyStatusData[0];

  constructor() {}

  select(st: ISurveyStatus) {
    for (const status of this.surveyStatusData) {
      status.selected = false;
      if (status.id === st.id) {
        status.selected = true;
        this.selected = st;
      }
    }
  }

  get surveyStatusData() {
    return this.statusData;
  }
}
