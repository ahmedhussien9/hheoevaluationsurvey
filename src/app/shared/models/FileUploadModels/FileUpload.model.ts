import { NgxFileDropEntry } from 'ngx-file-drop';
import { FilePreviw } from 'src/app/module/survey-form/interfaces/IFilePreview.interface';
import { IFileUpload } from 'src/app/module/survey-form/interfaces/IFileUpload.interface';

export abstract class FileUploadBase implements IFileUpload {
  files: File[];
  filesPreview: FilePreviw[];
  fileType: string;
  loading: boolean;
  public remove(file: FilePreviw): void {
    this.files.splice(file.id, 1);
  }

  public add(files: NgxFileDropEntry[]): void {
    throw new Error('Method not implemented.');
  }
}
