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
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getDutchPaginatorIntl } from 'src/app/shared/helper/dutch-paginator-intl';

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
  ],
})
export class SurveyFormModule {}
