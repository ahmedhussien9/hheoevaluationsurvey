import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImportsModule } from './material-imports/material.module';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    // directives
    // Pipes
  ],
  exports: [MaterialImportsModule, MatIconModule, HttpClientModule],
  imports: [
    HttpClientModule,
    // GoogleChartsModule,
  ],
  entryComponents: [],
})
export class SharedModule {}
