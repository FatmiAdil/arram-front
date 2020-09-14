import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastaModule } from 'ngx-toasta';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { MatConfirmDialogComponent } from './controls/mat-confirm-dialog/mat-confirm-dialog.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/material/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RelaisListComponent } from './components/relais/relais-list/relais-list.component';
import { RelaisDetailComponent } from './components/relais/relais-detail/relais-detail.component';
import { LicenceDetailComponent } from './components/licence/licence-detail/licence-detail.component';
import { LicenceListComponent } from './components/licence/licence-list/licence-list.component';
import { HomeComponent } from './components/home/home.component';
import { LicenceService } from './services/licence.service';



@NgModule({
  declarations: [
    AppComponent
    , MatConfirmDialogComponent
    , NavbarComponent
    , RelaisListComponent
    , RelaisDetailComponent
    , LicenceDetailComponent
    , LicenceListComponent
    , HomeComponent
  ],
  imports: [
    BrowserModule
    , BrowserAnimationsModule
    , LayoutModule
    , FormsModule
    , ReactiveFormsModule
    , HttpClientModule
    , AppRoutingModule
    , NgbModule
    , ToastaModule.forRoot()
    , MaterialModule
  ],
  entryComponents: [
    LicenceDetailComponent
    , RelaisDetailComponent
    , MatConfirmDialogComponent
  ],
  providers: [
    LicenceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
