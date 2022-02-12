import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ISurvey } from '../../interfaces/ISurvey.interface';
import { Location } from '@angular/common';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { HttpSurveyDetailService } from './services/http-survey-detail.service';
import { FilePreviw } from 'src/app/module/survey-form/interfaces/IFilePreview.interface';
import { NotificationService } from 'src/app/core/auth/services/notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  survey: ISurvey = this.httpSurveyDetailService.surveyDetail;
  faArrowCircleLeft = faArrowCircleLeft;
  $destroy = new Subject();
  downloadFileId: number[] = [];
  constructor(
    private httpSurveyDetailService: HttpSurveyDetailService,
    private location: Location,
    private cd: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  back() {
    this.location.back();
  }

  download(file: FilePreviw) {
    if (!this.downloadFileId.includes(file.id)) {
      this.downloadFileId.push(file.id);
      this.cd.detectChanges();
      this.notificationService.showWarn(`جاري تحميل الملف  ${file.name}`);
      this.httpSurveyDetailService
        .downloadFile(file.id)
        .pipe(takeUntil(this.$destroy))
        .subscribe(
          (response: Blob) => {
            const blob = new Blob([response], { type: file.type });
            var downloadURL = window.URL.createObjectURL(response);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = file.name;
            link.click();
            this.downloadFileId = this.downloadFileId.splice(file.id, 1);
            this.notificationService.showSuccess(
              `تم تحميل الملف بنجاح ${file.name}`
            );
            this.cd.detectChanges();
          },
          (err) => {
            this.notificationService.showError(
              err.error.message || 'Something went wrong, please try again'
            );
          }
        );
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next(null);
    this.$destroy.complete();
  }
}
