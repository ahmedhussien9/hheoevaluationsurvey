import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';

export class DropFileModel {
  private units = [
    'بايت',
    'كيلوبايت',
    'ميجا بايت',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
  ];
  size: number = 0;
  private fileMaxSizeHandler = (sizes: number) => Math.round(sizes / 1024);
  private filesMaxSizeNumber = 25096;

  constructor(
    public files: NgxFileDropEntry[],
    public type: string,
    private toaster: ToastrService
  ) {}

  public dropped(callback: Function) {
    let currentFile: File | any = null;
    for (const droppedFile of this.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: any) => {
          currentFile = file;
          this.size += file.size;
          if (this.isNotExceedMaxSizeNumber()) {
            currentFile['fileSize'] = this.niceBytes(file.size.toString());
            currentFile['fileType'] = this.type;
            console.log('filename', currentFile);
            callback(file);
          }
        });
      }
    }
  }

  /**
   * Check if the upload files size is not exceed the max size number which is 10mb
   * Boolean if is not exceed so it will return true otherwise false
   * @returns
   */
  private isNotExceedMaxSizeNumber(): boolean {
    if (this.fileMaxSizeHandler(this.size) >= this.filesMaxSizeNumber) {
      this.toaster.error(
        'نعتذر، الحد الأقصى لحجم الملفات يجب ان يكون اقل من 25 ميجابايت'
      );
      return false;
    }
    return true;
  }

  private niceBytes(x: string) {
    console.log(x);
    let l = 0,
      n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
      n = n / 1024;
    }

    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + this.units[l];
  }
}
