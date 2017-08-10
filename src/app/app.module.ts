import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdButtonToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
import { L_SEMANTIC_UI_MODULE } from 'angular2-semantic-ui';



import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyTripsComponent } from './pages/my-trips/my-trips.component';
import { TripPreviewComponent } from './pages/trip-preview/trip-preview.component';
import { TripViewerComponent } from './pages/trip-viewer/trip-viewer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TestsComponent } from './pages/tests/tests.component';
import { LikesComponent } from './pages/likes/likes.component';
import { ChoicesComponent } from './pages/choices/choices.component';

import { SignupService } from './shared/services/signup.service';
import { LogInService } from './shared/services/login.service';
import { ProfileService } from './shared/services/profile.service';
import { TestsService } from './shared/services/tests.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { TripService } from './shared/services/trip.service';

import { routing } from './app.routing';
import { LoginComponent } from './pages/login/login.component';

import { Config } from '../config';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    DashboardComponent,
    MyTripsComponent,
    TripPreviewComponent,
    TripViewerComponent,
    ProfileComponent,
    TestsComponent,
    LikesComponent,
    ChoicesComponent,
    LoginComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    Ng2DropdownModule,
    L_SEMANTIC_UI_MODULE,
    MdButtonToggleModule,

  ],
  providers: [
    TestsService,
    AuthenticationService,
    SignupService,
    LogInService,
    ProfileService,
    Config,
    TripService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
