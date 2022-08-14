"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileService = void 0;
var core_1 = require("@angular/core");
var peofile_model_1 = require("../models/peofile.model");
var ProfileService = /** @class */ (function () {
    function ProfileService(http, actRouter) {
        this.http = http;
        this.actRouter = actRouter;
        this.baseURL = 'http://localhost:3000/api/profile';
        this.email = localStorage.getItem('token');
        this.headers = { 'content-type': 'application/json' };
    }
    //A function continues the request to retrieve details for one user and returns the saved information
    ProfileService.prototype.getUserProfile = function () {
        return this.http.get(this.baseURL + ("/" + this.email));
    };
    // A function continues the request to add a vehicle that the user liked to his profile.
    ProfileService.prototype.addToProfile = function (car) {
        var body = JSON.stringify(new peofile_model_1.Profile(this.email, car, car.serialNumber));
        return this.http.post(this.baseURL, body, {
            headers: this.headers
        });
    };
    ProfileService.prototype.deleteCar = function (serialNumber) {
        return this.http["delete"](this.baseURL + ("/" + serialNumber));
    };
    ProfileService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
