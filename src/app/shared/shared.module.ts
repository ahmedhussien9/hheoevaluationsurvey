import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImportsModule } from './material-imports/material.module';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UrlValidatorDirective } from './directive/url.directive';

@NgModule({
  declarations: [SubmitButtonComponent, UrlValidatorDirective],
  exports: [
    MaterialImportsModule,
    MatIconModule,
    HttpClientModule,
    SubmitButtonComponent,
    FontAwesomeModule,
    UrlValidatorDirective,
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialImportsModule,
    MatIconModule,
  ],
  entryComponents: [],
})
export class SharedModule {}
