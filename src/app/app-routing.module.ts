import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ActionComponent } from './action/action.component';
import { AllcarsComponent } from './admin/allcars/allcars.component';
import { CardetailsComponent } from './cardetails/cardetails.component';
import { ContactComponent } from './contact/contact.component';
import { DateComponent } from './date/date.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShowcarsComponent } from './showcars/showcars.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignupComponent } from './signup/signup.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [{
  path:'',pathMatch:'full',redirectTo:'login'
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'home',
  component:HomeComponent
},
{
  path:'about',
  component:AboutComponent
},
{
  path:'signup',
  component:SignupComponent
},
{
  path:'auction',
  component:ActionComponent
},
{
  path: 'rentcars/:serialNumber', component:CardetailsComponent
},
{
  path:'rentcars',
  component:ShowcarsComponent
},
{
  path:'navbar',
  component:NavbarComponent
},
{
  path:'team',
  component:TeamComponent,
},
{
  path:'carRent',
  component:SidebarComponent,
},
{
  path:'contact',
  component:ContactComponent,
},
{
  path:'admin/cars',
  component:AllcarsComponent,
},
{
  path: 'date/:serialNumber', component:DateComponent
},
{
  path:'date',
  component:DateComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
