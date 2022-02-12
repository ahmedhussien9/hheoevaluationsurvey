import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-remove-button',
  templateUrl: './remove-button.component.html',
  styleUrls: ['./remove-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveButtonComponent implements OnInit {
  @Output() removeButton: EventEmitter<boolean> = new EventEmitter();
  faTrash = faTrash;
  constructor() {}

  ngOnInit(): void {}

  isClickRemove() {
    this.removeButton.emit(true);
  }
}
