import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';

export enum FileType {
  FIRST_SAMPLE = 'FIRST_SAMPLE',
  SECOND_SAMPLE = 'SECOND_SAMPLE',
  THIRD_SAMPLE = 'THIRD_SAMPLE',
}

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  firstSampleFiles: File[] = [];
  secondSampleFiles: File[] = [];
  thirdSampleFiles: File[] = [];
  units = ['بايت', 'كيلوبايت', 'ميجا بايت', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  constructor() {}

  private dropped(type: string, files: NgxFileDropEntry[]) {
    if (!this.validateFilesSize(files)) {
      return;
    }
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        console.log('fileEntry', fileEntry);
        fileEntry.file((file: any) => {
          console.log(droppedFile.relativePath, file);
          file['fileSize'] = this.niceBytes(file.size.toString());
          this.pushNewFiles(type, file);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public dropFileHandler(type: string, files: NgxFileDropEntry[]) {
    switch (type) {
      case FileType.FIRST_SAMPLE:
        this.dropped(type, files);
        break;
      case FileType.SECOND_SAMPLE:
        console.log('enttttterered');
        this.dropped(type, files);
        break;
      case FileType.THIRD_SAMPLE:
        this.dropped(type, files);
        break;
      default:
        break;
    }
  }

  public remove(type: string, index: number): void {
    switch (type) {
      case FileType.FIRST_SAMPLE:
        this.firstSampleFiles.splice(index, 1);
        break;
      case FileType.SECOND_SAMPLE:
        this.secondSampleFiles.splice(index, 1);
        break;
      case FileType.THIRD_SAMPLE:
        this.thirdSampleFiles.splice(index, 1);
        break;
    }
  }

  validateFilesSize(files: NgxFileDropEntry[]): boolean {
    const uploadedFiles: NgxFileDropEntry[] = files;
    let filesSize = 0;
    for (const dropFile of uploadedFiles) {
      const fileEntry = dropFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        filesSize += file.size;
      });
    }
    const sizes = Math.round(filesSize / 1024);
    if (sizes >= 10096) {
      alert('نعتذر، الحد الأقصى لحجم الملفات يجب ان يكون اقل من 10 ميجابايت');
      return false;
    }
    return true;
  }

  pushNewFiles(type: string, file: File) {
    switch (type) {
      case FileType.FIRST_SAMPLE:
        this.firstSampleFiles.push(file);
        break;
      case FileType.SECOND_SAMPLE:
        this.secondSampleFiles.push(file);
        break;
      case FileType.THIRD_SAMPLE:
        this.thirdSampleFiles.push(file);
        break;
      default:
        break;
    }
  }

  // setFilesToFormData(formData: FormData, files: File[]) {
  //   if (files.length > 0) {
  //     for (const file of files) {
  //       if (!file && !file) {
  //         formData.append('attachments', file); // file.name is optional
  //       }
  //     }
  //   }
  //   return formData;
  // }

  setFormGroup(formData: FormData, formGroup: FormGroup) {
    for (const field in formGroup.controls) {
      // 'field' is a string
      const control: AbstractControl | null = formGroup.get(field); // 'control' is a FormControl
      formData.append(field, control.value);
    }
    return formData;
  }

  niceBytes(x: string) {
    console.log(x);
    let l = 0,
      n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
      n = n / 1024;
    }

    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + this.units[l];
  }

  transform(file: any, size: string): string {
    console.log(file, size);
    return this.niceBytes(file[size]);
  }
}
