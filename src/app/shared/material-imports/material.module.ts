import { NgModule } from "@angular/core";

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


const material = [
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatRadioModule,
    MatRippleModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSlideToggleModule,

];

@NgModule({
    imports: [
        material,
    ],
    exports: [
        material
    ]
})
export class MaterialImportsModule { }
