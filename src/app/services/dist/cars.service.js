"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarsService = void 0;
var core_1 = require("@angular/core");
var treatment_model_1 = require("../models/treatment.model");
var CarsService = /** @class */ (function () {
    function CarsService(http, actRouter) {
        this.http = http;
        this.actRouter = actRouter;
        this.baseURL = 'http://localhost:3000/api/cars';
        this.baseURLMaxViews = 'http://localhost:3000/api/maxViewsCar';
        this.baseURLRentCar = 'http://localhost:3000/api/rentSort';
        this.baseURLRentCars = 'http://localhost:3000/api/rent';
        this.baseURLsendEmailCarInspectionDate = 'http://localhost:3000/api/sendEmailCarInspectionDate';
        this.baseURLtreatment = 'http://localhost:3000/api/treatment';
        this.baseURLOneCar = '';
        this.baseURLcatgory = '';
        this.email = localStorage.getItem('token');
        this.emailM = "testamara144141@gmail.com";
        this.headers = { 'content-type': 'application/json' };
    }
    // A function continues a request to retrieve all vehicles and returns the information we will use
    CarsService.prototype.getCars = function () {
        return this.http.get(this.baseURL);
    };
    // A function continues the request to retrieve all vehicles that have a high rating and returns the information we will use
    CarsService.prototype.getmaxViewsCar = function () {
        return this.http.get(this.baseURLMaxViews);
    };
    // A function continues the request to retrieve information of one vehicle and returns the information we will use
    CarsService.prototype.getOneCar = function (carSerialnumber) {
        this.baseURLOneCar = this.baseURL + "/serialNumber?serialNumber=" + carSerialnumber;
        return this.http.get(this.baseURLOneCar);
    };
    // A function continues a request to retrieve vehicles by one type and returns the information we will use
    CarsService.prototype.getCarOfCatgory = function (manufacturer) {
        this.baseURLcatgory = this.baseURL + "/manufacturer?manufacturer=" + manufacturer;
        return this.http.get(this.baseURLcatgory);
    };
    // Function continues the request to update Car in DB
    CarsService.prototype.putCar = function (car) {
        return this.http.put(this.baseURL + ("/" + car._id), car);
    };
    // Function continues the request to add a vehicle to the service
    CarsService.prototype.postCartreatment = function (car) {
        var body = JSON.stringify(new treatment_model_1.Treatment(car));
        return this.http.post(this.baseURLtreatment, body);
    };
    CarsService.prototype.postCar = function (car) {
        return this.http.post(this.baseURL, car, {
            headers: this.headers
        });
    };
    CarsService.prototype.deleteCar = function (_id) {
        return this.http["delete"](this.baseURL + ("/" + _id));
    };
    CarsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CarsService);
    return CarsService;
}());
exports.CarsService = CarsService;
