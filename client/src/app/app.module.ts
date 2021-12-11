import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FilmoviComponent } from './filmovi/filmovi.component';
import { ProjekcijeComponent } from './projekcije/projekcije.component';
import { ProfileComponent } from './User/Components/profile/profile.component';
import { UsersPanelComponent } from './User/Components/users-panel/users-panel.component';
import { WorkerComponent } from './User/Components/worker-panel/worker/worker.component';
import { CommonModule } from '@angular/common';
import { ManagementNavigationComponent } from './Components/management-navigation/management-navigation.component';
import { FilterPipe } from './User/Pipes/filter-pipe.pipe';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Auth/Components/Login/login/login.component';
import { RegisterComponent } from './Auth/Components/Register/register/register.component';
import { ConfirmMailComponent } from './Auth/Components/confirm-mail/confirm-mail.component';
import { UnathorizedComponent } from './Auth/Components/unathorized/unathorized.component';
import { PonudeComponent } from './Ponude/ponude/ponude.component';


@NgModule({
  declarations: [
    AppComponent,
    FilmoviComponent,
    ProjekcijeComponent,
    ProfileComponent,
    UsersPanelComponent,
    WorkerComponent,
    ManagementNavigationComponent,
    FilterPipe,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmMailComponent,
    UnathorizedComponent,
    PonudeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
