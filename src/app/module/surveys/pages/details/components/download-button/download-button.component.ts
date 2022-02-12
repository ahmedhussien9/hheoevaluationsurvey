import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadButtonComponent implements OnInit {
  @Output() downloadButton: EventEmitter<boolean> = new EventEmitter();
  faDownload = faFileDownload;
  @Input() loading: boolean = false;
  constructor() {}
  ngOnInit(): void {}

  isCLickDownload() {
    this.downloadButton.emit(true);
  }
}
