import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImportsModule } from './material-imports/material.module';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [SubmitButtonComponent,ErrorDialogComponent],
  exports: [
    MaterialImportsModule,
    MatIconModule,
    HttpClientModule,
    SubmitButtonComponent,
    ErrorDialogComponent,
  ],
  imports: [CommonModule, HttpClientModule],
  entryComponents: [],
})
export class SharedModule {}
