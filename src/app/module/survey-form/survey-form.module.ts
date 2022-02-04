import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyFormRoutingModule } from './survey-form-routing.module';
import { SurveyFormComponent } from './survey-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploadFileDetailsComponent } from './components/upload-file-details/upload-file-details.component';
import { RemoveButtonComponent } from './components/remove-button/remove-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { SubmitButtonComponent } from 'src/app/shared/components/submit-button/submit-button.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    SurveyFormComponent,
    UploadFileComponent,
    UploadFileDetailsComponent,
    RemoveButtonComponent,
    AddButtonComponent,
    SubmitButtonComponent,
    ProgressBarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SurveyFormRoutingModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    FontAwesomeModule,
  ],
})
export class SurveyFormModule {}
