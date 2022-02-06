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
export class ContractFilesService extends FileUploadBase {
  override files: File[] = [];
  override filesPreview: FilePreviw[] = [];
  override fileType = FileType.contractFiles;
  override loading = false;
  constructor(
    private httpSubmiturveyService: HttpSubmitSurveyService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }
  override add(files: NgxFileDropEntry[]) {
    const dropFileModel = new DropFileModel(files, this.fileType);

    if (this.validateMaxFilesNumber(files, this.files)) {
      this.toastr.error(
        `عذراً ، الحد الاقصى لعدد الملفات ${this.MAX_FILES_NUMBER}`
      );
      return;
    }

    dropFileModel.dropped((file: File) => {
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
              this.loading = false;
              this.filesPreview = [...data];
              this.cdr.detectChanges();
            },
            (err) => {
              this.loading = false;
            }
          );
      }
    } catch {
      this.loading = false;
      this.toastr.error('حدث خطأ فى تحميل الملفات');
    }
  }

  override remove(item: FilePreviw, index: number): void {
    this.httpSubmiturveyService
      .removeFile(item.id)
      .pipe(finalize(() => this.cdr.detectChanges()))
      .subscribe(
        (data) => {
          this.toastr.error(`تم حذف ${item.name} بنجاح`);
          this.filesPreview.splice(index, 1);
          this.files.splice(index, 1);
        },
        (err) => {
          throw new Error(err);
        }
      );
  }
}
