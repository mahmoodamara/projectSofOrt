import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ActionComponent } from './action/action.component';
import { ShowcarsComponent } from './showcars/showcars.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';
import { AllcarsComponent } from './admin/allcars/allcars.component';
import { DateComponent } from './date/date.component';
import { ProfileComponent } from './profile/profile.component';
import { CarActionComponent } from './car-action/car-action.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { SidebarAdminComponent } from './admin/sidebar-admin/sidebar-admin.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminActionComponent } from './admin/admin-action/admin-action.component';
import { AuthGuard } from './auth.guard';
import { AdminRentsComponent } from './admin/admin-rents/admin-rents.component';
import { CarsServiceComponent } from './admin/cars-service/cars-service.component';
import { TreatmentComponent } from './services/treatment/treatment.component';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ActionComponent,
    ShowcarsComponent,
    NavbarComponent,
    TeamComponent,
    ContactComponent,
    AllcarsComponent,
    DateComponent,
    ProfileComponent,
    CarActionComponent,
    DashbordComponent,
    SidebarAdminComponent,
    UsersComponent,
    AdminActionComponent,
    AdminRentsComponent,
    CarsServiceComponent,
    TreatmentComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
