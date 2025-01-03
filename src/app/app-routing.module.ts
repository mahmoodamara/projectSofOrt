import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionComponent } from './action/action.component';
import { AllcarsComponent } from './admin/allcars/allcars.component';
import { CarActionComponent } from './car-action/car-action.component';
import { ContactComponent } from './contact/contact.component';
import { DateComponent } from './date/date.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShowcarsComponent } from './showcars/showcars.component';
import { SignupComponent } from './signup/signup.component';
import { TeamComponent } from './team/team.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarAdminComponent } from './admin/sidebar-admin/sidebar-admin.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { UsersComponent } from './admin/users/users.component';
import { AuthGuard } from './auth.guard';
import { CarsServiceComponent } from './admin/cars-service/cars-service.component';

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
  path:'signup',
  component:SignupComponent
},
{
  path: 'auction/:serialNumber', component:ActionComponent,
  canActivate:[AuthGuard]
},
{
  path:'auction',
  component:ActionComponent,
  canActivate:[AuthGuard]
},
{
  path:'rentcars',
  component:ShowcarsComponent,
  canActivate:[AuthGuard]
},
{
  path:'navbar',
  component:NavbarComponent,
  canActivate:[AuthGuard]
},
{
  path:'team',
  component:TeamComponent,
  canActivate:[AuthGuard]
},
{
  path:'contact',
  component:ContactComponent,
  canActivate:[AuthGuard]
},
{
  path:'admin/cars',
  component:AllcarsComponent,
  canActivate:[AuthGuard]
},
{
  path: 'date/:serialNumber', component:DateComponent
},
{
  path:'date',
  component:DateComponent,
},
{

  path:'profile',
  component:ProfileComponent,
  canActivate:[AuthGuard]
},

{
  path:'carsAction',
  component:CarActionComponent,
  canActivate:[AuthGuard]

},
{
  path:'sidebar-Admin',
  component:SidebarAdminComponent,

},
{
  path:'dashbord',
  component:DashbordComponent,

},
{
  path:'users',
  component:UsersComponent,

},
{
  path:'carService',
  component:CarsServiceComponent,

},

{
  path:'allCars',
  component:AllcarsComponent,

},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
