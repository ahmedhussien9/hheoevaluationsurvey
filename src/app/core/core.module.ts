import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AdminComponent, LoginComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [AdminComponent],
})
export class CoreModule {}
