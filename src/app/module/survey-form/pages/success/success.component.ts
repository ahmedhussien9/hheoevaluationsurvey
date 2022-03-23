import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  constructor(private location: Location) {}

  ngOnInit(): void {}

  back() {
    this.location.back();
  }
}
