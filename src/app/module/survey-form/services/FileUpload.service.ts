import { ChangeDetectorRef, Injectable } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { finalize } from 'rxjs/internal/operators/finalize';
import { map } from 'rxjs/internal/operators/map';
import { NotificationService } from 'src/app/core/auth/services/notification.service';
import { HttpSubmitSurveyService } from 'src/app/module/survey-form/services/http-survey.service';
import checkMaxFileNumber from 'src/app/shared/models/FileUploadModels/validation/maxNumberOfFiles.model';
import CheckMaxFilesSizeValidation from 'src/app/shared/models/FileUploadModels/validation/maxSizeFiles.model';
import { BuildFormDataModel } from '../../../shared/models/FileUploadModels/BuildFormData.model';
import { DropFileModel } from '../../../shared/models/FileUploadModels/dropFile.model';
import { FileUploadBase } from '../../../shared/models/FileUploadModels/FileUpload.model';
import { FilePreviw } from '../interfaces/IFilePreview.interface';
@Injectable()
export class FileUploadService extends FileUploadBase {
  override files: File[] = [];
  override filesPreview: FilePreviw[] = [];
  override loading = false;
  override isStartUploading: boolean = false;
  override removedFilesIndx: number[] = [];
  override fileType: string;

  constructor(
    private httpSubmiturveyService: HttpSubmitSurveyService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  override setfileType(fileType: any) {
    this.fileType = fileType;
  }

  override getFileType() {
    return this.fileType;
  }

  override async add(files: NgxFileDropEntry[]) {
    this.loading = true;
    this.startUploading();
    this.cdr.detectChanges();

    try {
      const fileDropModel = new DropFileModel(
        this.getFileType(),
        this.notificationService
      );
      this.files = await fileDropModel.dropped(files);
      if (
        checkMaxFileNumber(this.filesPreview, this.files, this.MAX_FILES_NUMBER)
      ) {
        this.notificationService.showError(
          'نعتذر لقد تجاوزت الحد الأقصي لعدد الملفات 7 '
        );
        this.loading = false;
        this.endUploading();
        this.files = [];
        this.cdr.detectChanges();
      }
      // Check tha maximaum size of files which is 25 mb
      if (
        CheckMaxFilesSizeValidation(
          this.filesPreview,
          this.files,
          this.filesMaxSizeNumber
        )
      ) {
        this.loading = false;
        this.endUploading();
        this.notificationService.showError(
          'نعتذر لقد تجاوزت الحد الأقصي 25 ميجابايت'
        );
        this.files = [];
        this.cdr.detectChanges();
        return;
      }

      if (this.files.length > 0) {
        this.sendRequest();
      }
    } catch (err: any) {
      this.notificationService.showError(err);
    }
  }

  override sendRequest() {
    try {
      const buildFormDataModel = new BuildFormDataModel(
        this.files,
        this.fileType
      );
      this.httpSubmiturveyService
        .uploadingFile(buildFormDataModel.formData)
        .pipe(
          map((data: FilePreviw[]) => {
            const files = data;
            files.forEach((file) => {
              file.size = this.extractNumber(file.fileSize);
            });
            return files;
          }),
          finalize(() => (this.loading = false))
        )
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

  override uploadedFilesDone(newFiles: FilePreviw[]): void {
    this.loading = false;
    this.filesPreview = this.filesPreview.concat(newFiles);
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
