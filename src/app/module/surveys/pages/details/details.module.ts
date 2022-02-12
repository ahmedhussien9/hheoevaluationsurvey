import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DownloadFileComponent } from './components/download-file/download-file.component';
import { DetailsComponent } from './details.component';
import { DetailRoutingModule } from './details-routing.module';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { SurveyDetailGuard } from './details.guard';

@NgModule({
  declarations: [
    DetailsComponent,
    DownloadFileComponent,
    DownloadButtonComponent,
  ],
  imports: [CommonModule, SharedModule, DetailRoutingModule],
  providers: [SurveyDetailGuard],
})
export class DetailsModule {}
