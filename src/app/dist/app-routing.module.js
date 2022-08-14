"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var action_component_1 = require("./action/action.component");
var allcars_component_1 = require("./admin/allcars/allcars.component");
var car_action_component_1 = require("./car-action/car-action.component");
var contact_component_1 = require("./contact/contact.component");
var date_component_1 = require("./date/date.component");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var navbar_component_1 = require("./navbar/navbar.component");
var showcars_component_1 = require("./showcars/showcars.component");
var signup_component_1 = require("./signup/signup.component");
var team_component_1 = require("./team/team.component");
var profile_component_1 = require("./profile/profile.component");
var sidebar_admin_component_1 = require("./admin/sidebar-admin/sidebar-admin.component");
var dashbord_component_1 = require("./admin/dashbord/dashbord.component");
var users_component_1 = require("./admin/users/users.component");
var auth_guard_1 = require("./auth.guard");
var cars_service_component_1 = require("./admin/cars-service/cars-service.component");
var routes = [{
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'signup',
        component: signup_component_1.SignupComponent
    },
    {
        path: 'auction/:serialNumber', component: action_component_1.ActionComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'auction',
        component: action_component_1.ActionComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'rentcars',
        component: showcars_component_1.ShowcarsComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'navbar',
        component: navbar_component_1.NavbarComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'team',
        component: team_component_1.TeamComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'contact',
        component: contact_component_1.ContactComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/cars',
        component: allcars_component_1.AllcarsComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'date/:serialNumber', component: date_component_1.DateComponent
    },
    {
        path: 'date',
        component: date_component_1.DateComponent
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'carsAction',
        component: car_action_component_1.CarActionComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'sidebar-Admin',
        component: sidebar_admin_component_1.SidebarAdminComponent
    },
    {
        path: 'dashbord',
        component: dashbord_component_1.DashbordComponent
    },
    {
        path: 'users',
        component: users_component_1.UsersComponent
    },
    {
        path: 'carService',
        component: cars_service_component_1.CarsServiceComponent
    },
    {
        path: 'allCars',
        component: allcars_component_1.AllcarsComponent
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
