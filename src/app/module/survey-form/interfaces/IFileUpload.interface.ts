import { NgxFileDropEntry } from 'ngx-file-drop';
import { FilePreviw } from './IFilePreview.interface';

export interface IFileUpload {
  files: File[];
  filesPreview: FilePreviw[];
  fileType: string;
  loading: boolean;
  MAX_FILES_NUMBER: number;
  isStartUploading: boolean;
  remove(file: FilePreviw, i: number): void;
  add(files: NgxFileDropEntry[]): void;
  validateMaxFilesNumber(
    upCommingFiles: NgxFileDropEntry[],
    currentFiles: FilePreviw[]
  ): boolean;
}
