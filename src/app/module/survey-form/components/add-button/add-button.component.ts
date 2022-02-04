import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
})
export class AddButtonComponent implements OnInit {
  @Output() addButton: EventEmitter<boolean> = new EventEmitter();
  faPlus = faPlus;
  constructor() {}

  ngOnInit(): void {}

  isClickButton() {
    this.addButton.emit(true);
  }
}
