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
  filesMaxSizeNumber = 25096;

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

  public checkMaxSize(
    currentFiles: FilePreviw[],
    upCommingFiles: File[],
    max_size: number
  ) {
    let totalFilesSize = 0;

    for (let index = 0; index < upCommingFiles.length; index++) {
      const element = upCommingFiles[index];
      totalFilesSize += Math.round(element.size / 1024);
    }

    for (let index = 0; index < currentFiles.length; index++) {
      const element = currentFiles[index];
      totalFilesSize += element.size;
    }
    console.log('Check max size function', totalFilesSize >= max_size);
    console.log('Check max size function', totalFilesSize, max_size);
    return totalFilesSize >= max_size;
  }

  public checkMaxFileNumber(
    currentFiles: FilePreviw[],
    upCommingFiles: File[],
    maxNumber: number
  ) {
    return currentFiles.length + upCommingFiles.length > maxNumber;
  }

  public extractNumber(text: string): number {
    return parseInt(text.replace(/\D/g, ''));
  }
}
