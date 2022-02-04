import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitButtonComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() title: string;
  @Output() isClickedEvent = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}

  isClicked() {
    this.isClickedEvent.emit();
  }
}
