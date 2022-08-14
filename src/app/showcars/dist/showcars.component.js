"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShowcarsComponent = void 0;
var core_1 = require("@angular/core");
var cars_model_1 = require("../models/cars.model");
var ShowcarsComponent = /** @class */ (function () {
    function ShowcarsComponent(carsService, acutionservice, rentService, profileService) {
        this.carsService = carsService;
        this.acutionservice = acutionservice;
        this.rentService = rentService;
        this.profileService = profileService;
        this.cars = [];
        this.codes = [];
        this.showMassegeSuccses = false;
        this.showMassegeError = false;
        this.mostWatchedArray = [];
        this.showMostWatched = true;
        this.showCar = true;
        this.car = new cars_model_1.Cars();
    }
    ShowcarsComponent.prototype.ngOnInit = function () {
        this.getCars();
        this.mostChecked();
        // this.getCodes();
        // this.timer();
    };
    //The function retrieves the 4 vehicles that were rented on the site.
    ShowcarsComponent.prototype.mostChecked = function () {
        var _this = this;
        this.showMostWatched = true;
        this.showCar = false;
        this.carsService.getmaxViewsCar().subscribe(function (data) {
            _this.mostWatchedArray = data;
        });
    };
    //The function initializes the variable that stores the vehicles in Mazda
    ShowcarsComponent.prototype.mazda = function () {
        this.showMostWatched = false;
        this.showCar = true;
        this.manufacturer = 'mazda';
        this.getCars();
    };
    //The function initializes the variable that stores the vehicles in Toyota
    ShowcarsComponent.prototype.toyota = function () {
        this.showMostWatched = false;
        this.showCar = true;
        this.manufacturer = 'toyota';
        this.getCars();
    };
    //The function initializes the variable that stores the vehicles in Ford
    ShowcarsComponent.prototype.ford = function () {
        this.showMostWatched = false;
        this.showCar = true;
        this.manufacturer = 'ford';
        this.getCars();
    };
    //The function extracts the vehicles according to the category selected in the previous functions.
    ShowcarsComponent.prototype.getCars = function () {
        var _this = this;
        this.carsService.getCarOfCatgory(this.manufacturer).subscribe(function (data) {
            _this.mostWatchedArray = data;
        });
    };
    //A function that adds the vehicle chosen by the user to save it in his profile.
    ShowcarsComponent.prototype.addToProfile = function (car) {
        var _this = this;
        this.profileService.addToProfile(car).subscribe(function (data) {
            _this.showMassegeSuccses = true;
            setTimeout(function () { return _this.showMassegeSuccses = false; }, 2000);
        }, function (err) {
        });
    };
    ShowcarsComponent = __decorate([
        core_1.Component({
            selector: 'app-showcars',
            templateUrl: './showcars.component.html',
            styleUrls: ['./showcars.component.css']
        })
    ], ShowcarsComponent);
    return ShowcarsComponent;
}());
exports.ShowcarsComponent = ShowcarsComponent;
