import { NgxFileDropEntry } from 'ngx-file-drop';
import { FilePreviw } from 'src/app/module/survey-form/interfaces/IFilePreview.interface';
import { IFileUpload } from 'src/app/module/survey-form/interfaces/IFileUpload.interface';

export abstract class FileUploadBase implements IFileUpload {
  files: File[];
  filesPreview: FilePreviw[];
  fileType: string;
  loading: boolean;
  MAX_FILES_NUMBER: number = 7;
  public remove(file: FilePreviw, index: number): void {
    this.files.splice(index, 1);
  }

  public validateMaxFilesNumber(
    upCommingFiles: NgxFileDropEntry[],
    currentFiles: File[]
  ) {
    return upCommingFiles.length + currentFiles.length >
      this.MAX_FILES_NUMBER || upCommingFiles.length > this.MAX_FILES_NUMBER
      ? true
      : false;
  }

  public add(files: NgxFileDropEntry[]): void {
    throw new Error('Method not implemented.');
  }
}
