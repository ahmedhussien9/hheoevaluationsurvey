import { Component, OnInit } from '@angular/core';
import {
  SwUpdate,
  UpdateAvailableEvent,
  UpdateActivatedEvent,
} from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { SnackBarService } from '../services/_snakbar.service';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent {
  constructor() {}
}
