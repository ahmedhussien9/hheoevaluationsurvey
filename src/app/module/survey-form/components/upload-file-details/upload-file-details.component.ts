import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-upload-file-details',
  templateUrl: './upload-file-details.component.html',
  styleUrls: ['./upload-file-details.component.scss'],
})
export class UploadFileDetailsComponent implements OnInit {
  @Input() file: any | undefined;
  @Output() deleteFile = new EventEmitter();
  @Input() number: number | undefined = 0;
  constructor() {}
  ngOnInit(): void {}

  deleteFileHandler() {
    this.deleteFile.emit();
  }
}
