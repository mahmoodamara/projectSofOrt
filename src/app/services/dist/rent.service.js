"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RentService = void 0;
var core_1 = require("@angular/core");
var RentService = /** @class */ (function () {
    function RentService(http) {
        this.http = http;
        this.car = [];
        this.baseURLRentCars = 'http://localhost:3000/api/rent';
    }
    // A function continues the request to retrieve all rental vehicles and returns the saved information
    RentService.prototype.getCarRent = function () {
        return this.http.get(this.baseURLRentCars);
    };
    // Function continues the request to add a car rental queue
    RentService.prototype.postRent = function (rent) {
        return this.http.post(this.baseURLRentCars, rent);
    };
    // A function continues the request to retrieve information of one vehicle and returns the saved information
    RentService.prototype.getOneRent = function (carSerialnumber) {
        return this.http.get(this.baseURLRentCars + ("/serialNumber?serialNumber=" + carSerialnumber));
    };
    // Function continues the request to delete a car that is rented.
    RentService.prototype.deleteCarRent = function (_id, serialNumber) {
        return this.http["delete"](this.baseURLRentCars + ("/" + _id + "/" + serialNumber));
    };
    RentService.prototype.deleteRent = function (_id) {
        return this.http["delete"](this.baseURLRentCars + ("/" + _id));
    };
    // Function continues the request to delete a user from a rented vehicle.
    RentService.prototype.deleteOneUserRent = function (email, serialNumber) {
        return this.http.get(this.baseURLRentCars + ("/" + serialNumber + "/" + email));
    };
    RentService.prototype.putUserAuction = function (user) {
        return this.http.put(this.baseURLRentCars + ("/" + user.email), user);
    };
    RentService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RentService);
    return RentService;
}());
exports.RentService = RentService;
