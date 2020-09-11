import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    BrowserModule
    , BrowserAnimationsModule
    , CommonModule
    , Material.MatButtonModule
    , Material.MatCardModule
    , Material.MatDatepickerModule
    , Material.MatDialogModule
    , Material.MatFormFieldModule
    , Material.MatIconModule
    , Material.MatInputModule
    , Material.MatNativeDateModule
    , Material.MatListModule
    , Material.MatMenuModule
    , Material.MatPaginatorModule
    , Material.MatProgressBarModule
    , Material.MatRadioModule
    , Material.MatSelectModule
    , Material.MatSidenavModule
    , Material.MatSortModule
    , Material.MatProgressSpinnerModule
    , Material.MatStepperModule
    , Material.MatTableModule
    , Material.MatTabsModule
    , Material.MatToolbarModule
    // , NgbModule
  ],
  exports: [
    BrowserModule
    , BrowserAnimationsModule
    , CommonModule
    , Material.MatButtonModule
    , Material.MatCardModule
    , Material.MatDatepickerModule
    , Material.MatDialogModule
    , Material.MatFormFieldModule
    , Material.MatIconModule
    , Material.MatInputModule
    , Material.MatMenuModule
    , Material.MatNativeDateModule
    , Material.MatListModule
    , Material.MatPaginatorModule
    , Material.MatProgressBarModule
    , Material.MatRadioModule
    , Material.MatSelectModule
    , Material.MatSidenavModule
    , Material.MatSortModule
    , Material.MatProgressSpinnerModule
    , Material.MatStepperModule
    , Material.MatTableModule
    , Material.MatTabsModule
    , Material.MatToolbarModule
    // , NgbModule
  ],
  declarations: [],
  providers: [
    Material.MatDatepickerModule
    , { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
  ],
})
export class MaterialModule { }
