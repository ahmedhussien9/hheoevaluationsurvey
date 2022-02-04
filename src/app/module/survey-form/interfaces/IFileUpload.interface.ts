import { NgxFileDropEntry } from "ngx-file-drop";
import { FilePreviw } from "./IFilePreview.interface";

export interface IFileUpload {
  files: File[];
  remove(file: FilePreviw): void;
  add(files: NgxFileDropEntry[]): void;
}
