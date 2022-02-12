import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsComponent } from './details.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class DetailRoutingModule {}
