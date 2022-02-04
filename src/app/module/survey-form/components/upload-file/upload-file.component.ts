import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  @Output() filesEvent = new EventEmitter();
  @Input() filesCount: number = 0;
  @Input() sampleTitle: string = '';
  constructor() {}

  ngOnInit(): void {}
  // public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.filesEvent.emit(files);
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
}
