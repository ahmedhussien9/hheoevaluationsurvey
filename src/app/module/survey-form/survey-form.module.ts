import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyFormRoutingModule } from './survey-form-routing.module';
import { SurveyFormComponent } from './survey-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploadFileDetailsComponent } from './components/upload-file-details/upload-file-details.component';
import { RemoveButtonComponent } from './components/remove-button/remove-button.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { arLocale } from 'ngx-bootstrap/locale';
defineLocale('ar', arLocale); //only setting up Norwegian bokmaal (ar) in this sample

@NgModule({
  declarations: [
    SurveyFormComponent,
    UploadFileComponent,
    UploadFileDetailsComponent,
    RemoveButtonComponent,
    AddButtonComponent,
    ProgressBarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SurveyFormRoutingModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    BsDatepickerModule.forRoot(),
  ],
})
export class SurveyFormModule {
  constructor(private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use('ar'); //fecha en español, datepicker
  }
}
