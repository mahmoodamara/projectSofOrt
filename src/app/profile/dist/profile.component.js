"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var user_model_1 = require("../models/user.model");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(profileService, userService, carService, router) {
        this.profileService = profileService;
        this.userService = userService;
        this.carService = carService;
        this.router = router;
        this.Profile = [];
        this.user = [];
        this.putUser = new user_model_1.User();
        this.showSucessMessage = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getUser();
        this.getCars();
        console.log(localStorage.getItem('token'));
    };
    // A function that retrieves the information of the logged in user
    ProfileComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (data) {
            _this.user = data;
            _this.putUser = _this.user[0];
        });
    };
    // A function that retrieves the vehicles saved by the logged in user
    ProfileComponent.prototype.getCars = function () {
        var _this = this;
        this.profileService.getUserProfile().subscribe(function (data) {
            _this.Profile = data;
        });
    };
    // A function allows updating the details of a logged in user
    ProfileComponent.prototype.putProfile = function () {
        var _this = this;
        this.userService.putUserProfile(this.putUser).subscribe(function (res) {
            _this.showSucessMessage = true;
            setTimeout(function () { return _this.showSucessMessage = false; }, 2000);
        });
    };
    // A function that allows for the deletion of vehicles that have been saved by a logged in user
    ProfileComponent.prototype.deleteCar = function (car) {
        var _this = this;
        this.profileService.deleteCar(car.serialNumber).subscribe(function (res) {
            _this.getCars();
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
