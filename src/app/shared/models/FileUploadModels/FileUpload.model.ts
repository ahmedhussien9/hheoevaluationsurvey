import { ChangeDetectorRef } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FilePreviw } from 'src/app/module/survey-form/interfaces/IFilePreview.interface';
import { IFileUpload } from 'src/app/module/survey-form/interfaces/IFileUpload.interface';

export abstract class FileUploadBase implements IFileUpload {
  files: File[];
  filesPreview: FilePreviw[];
  fileType: string;
  loading: boolean;
  MAX_FILES_NUMBER: number = 7;
  isStartUploading: boolean = false;

  public remove(file: FilePreviw, index: number): void {
    throw Error('remove is not called!');
  }

  public validateMaxFilesNumber(
    upCommingFiles: NgxFileDropEntry[],
    currentFiles: FilePreviw[]
  ) {
    return upCommingFiles.length + currentFiles.length >
      this.MAX_FILES_NUMBER || upCommingFiles.length > this.MAX_FILES_NUMBER
      ? true
      : false;
  }



  public add(files: NgxFileDropEntry[]): void {
    throw new Error('Method not implemented.');
  }

  public startUploading() {
    return (this.isStartUploading = true);
  }

  public endUploading() {
    return (this.isStartUploading = false);
  }
}
