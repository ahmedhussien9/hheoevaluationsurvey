import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AdminComponent, HeaderComponent, PublicLayoutComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [AdminComponent],
  providers: [],
})
export class CoreModule {}
