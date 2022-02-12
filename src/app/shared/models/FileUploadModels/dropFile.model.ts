import { NgxFileDropEntry } from 'ngx-file-drop';
import { NotificationService } from 'src/app/core/auth/services/notification.service';

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
  public isFinished: boolean = false;
  constructor(
    public type: string,
    private notificationService: NotificationService
  ) {}

  public async dropped(files: NgxFileDropEntry[]): Promise<File[]> {
    const convertedFiles: File[] = [];
    let currentFile: File | any = null;
    return await new Promise((resolve, reject) => {
      for (const droppedFile of files) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: any) => {
            currentFile = file;
            currentFile['fileType'] = this.type;
            currentFile['fileSize'] = this.niceBytes(file.size.toString());
            convertedFiles.push(currentFile);
          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          console.log(droppedFile.relativePath, fileEntry);
        }
      }
      setTimeout(() => {
        resolve(convertedFiles);
        reject(
          new Error(
            'Something went wrong while uploading files, please try again!!!'
          )
        );
      }, 3000);
    });
  }

  /**
   * Check if the upload files size is not exceed the max size number which is 10mb
   * Boolean if is not exceed so it will return true otherwise false
   * @returns
   */
  private isNotExceedMaxSizeNumber(size: number, maxSize: number): boolean {
    if (this.fileMaxSizeHandler(size) >= maxSize) {
      this.notificationService.showWarn(
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
