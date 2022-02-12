import { FilePreviw } from 'src/app/module/survey-form/interfaces/IFilePreview.interface';
import { HttpSurveyDetailService } from '../services/http-survey-detail.service';

export class DownloadModel {
  constructor(
    public file: FilePreviw,
    private httpSurveyDetailService: HttpSurveyDetailService
  ) {}

  download() {
    this.httpSurveyDetailService.downloadFile(this.file.id);
  }
}
