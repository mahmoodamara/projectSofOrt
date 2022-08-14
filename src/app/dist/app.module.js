"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var signup_component_1 = require("./signup/signup.component");
var login_component_1 = require("./login/login.component");
var home_component_1 = require("./home/home.component");
var action_component_1 = require("./action/action.component");
var showcars_component_1 = require("./showcars/showcars.component");
var navbar_component_1 = require("./navbar/navbar.component");
var team_component_1 = require("./team/team.component");
var contact_component_1 = require("./contact/contact.component");
var allcars_component_1 = require("./admin/allcars/allcars.component");
var date_component_1 = require("./date/date.component");
var profile_component_1 = require("./profile/profile.component");
var car_action_component_1 = require("./car-action/car-action.component");
var dashbord_component_1 = require("./admin/dashbord/dashbord.component");
var sidebar_admin_component_1 = require("./admin/sidebar-admin/sidebar-admin.component");
var users_component_1 = require("./admin/users/users.component");
var admin_action_component_1 = require("./admin/admin-action/admin-action.component");
var auth_guard_1 = require("./auth.guard");
var admin_rents_component_1 = require("./admin/admin-rents/admin-rents.component");
var cars_service_component_1 = require("./admin/cars-service/cars-service.component");
var treatment_component_1 = require("./services/treatment/treatment.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                signup_component_1.SignupComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                action_component_1.ActionComponent,
                showcars_component_1.ShowcarsComponent,
                navbar_component_1.NavbarComponent,
                team_component_1.TeamComponent,
                contact_component_1.ContactComponent,
                allcars_component_1.AllcarsComponent,
                date_component_1.DateComponent,
                profile_component_1.ProfileComponent,
                car_action_component_1.CarActionComponent,
                dashbord_component_1.DashbordComponent,
                sidebar_admin_component_1.SidebarAdminComponent,
                users_component_1.UsersComponent,
                admin_action_component_1.AdminActionComponent,
                admin_rents_component_1.AdminRentsComponent,
                cars_service_component_1.CarsServiceComponent,
                treatment_component_1.TreatmentComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            providers: [auth_guard_1.AuthGuard],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
