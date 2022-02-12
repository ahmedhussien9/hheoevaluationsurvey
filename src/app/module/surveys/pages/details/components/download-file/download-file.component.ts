import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadFileComponent implements OnInit {
  @Input() file: any | undefined;
  @Output() downloadFile = new EventEmitter();
  @Input() number: number | undefined = 0;
  @Input() loading: boolean = false;
  constructor() {}
  ngOnInit(): void {}

  downloadFileHandler() {
    this.downloadFile.emit();
  }
}
