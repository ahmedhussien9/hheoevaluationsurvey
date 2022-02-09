import { ChangeDetectorRef, Injectable } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/internal/operators/finalize';
import { HttpSubmitSurveyService } from 'src/app/module/survey-form/services/http-survey.service';
import { BuildFormDataModel } from '../../../shared/models/FileUploadModels/BuildFormData.model';
import { DropFileModel } from '../../../shared/models/FileUploadModels/dropFile.model';
import { FileType } from '../../../shared/models/FileUploadModels/File.types';
import { FileUploadBase } from '../../../shared/models/FileUploadModels/FileUpload.model';
import { FilePreviw } from '../interfaces/IFilePreview.interface';

@Injectable()
export class SecurityProtocolsDocumentsService extends FileUploadBase {
  override files: File[] = [];
  override fileType = FileType.securityProtocolsDocuments;
  override filesPreview: FilePreviw[] = [];
  override loading = false;
  override isStartUploading: boolean = false;

  constructor(
    private httpSubmiturveyService: HttpSubmitSurveyService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  override add(files: NgxFileDropEntry[]) {
    if (this.validateMaxFilesNumber(files, this.filesPreview)) {
      this.toastr.error(
        `عذراً ، الحد الاقصى لعدد الملفات ${this.MAX_FILES_NUMBER}`
      );
      return;
    }

    const dropFileModel = new DropFileModel(files, this.fileType, this.toastr);

    if (files.length + this.files.length > 7) {
      this.toastr.error('عذراً، الحد الأقصى لعدد الملفات 7');
      return;
    }
    dropFileModel.dropped((file: File) => {
      this.startUploading();
      this.files.push(file);
    });
    try {
      const buildFormDataModel = new BuildFormDataModel(
        this.files,
        this.fileType
      );
      if (this.files.length > 0) {
        this.loading = true;
        this.httpSubmiturveyService
          .uploadingFile(buildFormDataModel.formData)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe(
            (data: FilePreviw[]) => {
              this.uploadedFilesDone(data);
            },
            (err) => {
              this.toastr.error(err.error.message);
              this.loading = false;
              this.cdr.detectChanges();
            }
          );
      }
    } catch {
      this.loading = false;
      this.toastr.error('حدث خطأ فى تحميل الملفات');
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
    this.httpSubmiturveyService.removeFile(item.id).subscribe(
      (data) => {
        console.log(data);
        this.toastr.error(`تم حذف ${item.name} بنجاح`);
        this.filesPreview.splice(index, 1);
        this.files.splice(index, 1);
        this.cdr.detectChanges();
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
        throw new Error(err);
      }
    );
  }
}
