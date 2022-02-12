import { ChangeDetectorRef, Injectable } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/internal/operators/finalize';
import { NotificationService } from 'src/app/core/auth/services/notification.service';
import { HttpSubmitSurveyService } from 'src/app/module/survey-form/services/http-survey.service';
import { BuildFormDataModel } from '../../../shared/models/FileUploadModels/BuildFormData.model';
import { DropFileModel } from '../../../shared/models/FileUploadModels/dropFile.model';
import { FileType } from '../../../shared/models/FileUploadModels/File.types';
import { FileUploadBase } from '../../../shared/models/FileUploadModels/FileUpload.model';
import { FilePreviw } from '../interfaces/IFilePreview.interface';

@Injectable()
export class SystemImagesService extends FileUploadBase {
  override files: File[] = [];
  override fileType = FileType.systemImages;
  override filesPreview: FilePreviw[] = [];
  override loading = false;
  override isStartUploading: boolean = false;
  public removedFilesIndx: number[] = [];

  constructor(
    private httpSubmiturveyService: HttpSubmitSurveyService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  override async add(files: NgxFileDropEntry[]) {
    this.loading = true;
    this.startUploading();
    this.cdr.detectChanges();
    try {
      const fileDropModel = new DropFileModel(
        this.fileType,
        this.notificationService
      );
      this.files = await fileDropModel.dropped(files);
      if (this.files.length > 0) {
        this.sendRequest();
      }
    } catch (err: any) {
      this.notificationService.showError(err);
    }
  }

  private sendRequest() {
    try {
      const buildFormDataModel = new BuildFormDataModel(
        this.files,
        this.fileType
      );
      this.httpSubmiturveyService
        .uploadingFile(buildFormDataModel.formData)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(
          (data: FilePreviw[]) => {
            this.uploadedFilesDone(data);
          },
          (err) => {
            console.log(err);
            this.notificationService.showError(err.error.message);
            this.loading = false;
            this.cdr.detectChanges();
          }
        );
    } catch {
      this.loading = false;
      this.notificationService.showError('حدث خطأ فى تحميل الملفات');
      this.cdr.detectChanges();
    }
  }

  public uploadedFilesDone(data: FilePreviw[]): void {
    this.loading = false;
    this.filesPreview = this.filesPreview.concat(data);
    this.files = [];
    this.endUploading();
    this.cdr.detectChanges();
  }

  override remove(item: FilePreviw, index: number): void {
    if (!this.removedFilesIndx.includes(index)) {
      this.notificationService.showSuccess('جاري حذف الملف');
      this.removedFilesIndx.push(index);
      this.httpSubmiturveyService
        .removeFile(item.id)
        .pipe(finalize(() => this.cdr.detectChanges()))
        .subscribe(
          (data) => {
            this.notificationService.showSuccess(`تم حذف ${item.name} بنجاح`);
            this.filesPreview.splice(index, 1);
            this.files.splice(index, 1);
            this.removedFilesIndx.splice(index, 1);
          },
          (err) => {
            this.notificationService.showError(err.error.message || '');
            throw new Error(err);
          }
        );
    } else {
      this.notificationService.showWarn('من فضلك أنتظر قليلاً');
    }
  }
}
