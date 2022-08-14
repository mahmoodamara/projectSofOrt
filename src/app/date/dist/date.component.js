"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DateComponent = void 0;
var core_1 = require("@angular/core");
var rent_model_1 = require("../models/rent.model");
var DateComponent = /** @class */ (function () {
    function DateComponent(carservice, actRouter, rentService) {
        this.carservice = carservice;
        this.actRouter = actRouter;
        this.rentService = rentService;
        this.car = [];
        this.rents = [];
        this.listDates = [];
        this.rent = new rent_model_1.Rent();
        this.showErrorMessage = false;
        this.showSuccssMessage = false;
    }
    DateComponent.prototype.ngOnInit = function () {
        this.carSerialnumber = this.actRouter.snapshot.params['serialNumber'];
        this.refreshCars();
        this.getRents();
    };
    // A function retrieves the vehicle that the user decided to purchase.
    DateComponent.prototype.refreshCars = function () {
        var _this = this;
        this.carservice.getOneCar(this.carSerialnumber).subscribe(function (data) {
            _this.car = data;
            _this.listDates = data;
            console.log(_this.car);
            _this.carType = _this.car[0].manufacturer;
        });
    };
    // A function retrieves the vehicle that the user decided to purchase
    DateComponent.prototype.getRents = function () {
        var _this = this;
        this.rentService.getOneRent(this.carSerialnumber).subscribe(function (data) {
            _this.rents = data;
        });
    };
    // The function checks the rental conditions entered by the user
    DateComponent.prototype.checkRent = function () {
        var f = 0;
        var d = new Date().getDate();
        var dCheckIn = new Date(this.rent.checkIn).getDate();
        var dCheckOt = new Date(this.rent.checkOut).getDate();
        for (var i = 0; i < this.rents.length; i++) {
            if (this.rent.checkOut < this.rent.checkIn) {
                f = 1;
            }
            if ((this.rent.checkIn >= this.rents[i].rent[i].checkIn && this.rent.checkOut <= this.rents[i].rent[i].checkOut)) {
                f = 1;
            }
            if ((this.rent.checkIn >= this.rents[i].rent[i].checkIn && this.rent.checkIn <= this.rents[i].rent[i].checkOut) && this.rent.checkOut > this.rents[i].rent[i].checkOut) {
                f = 1;
            }
            if ((this.rent.checkIn <= this.rents[i].rent[i].checkIn) && (this.rent.checkOut >= this.rents[i].rent[i].checkIn && this.rent.checkOut <= this.rents[i].rent[i].checkOut)) {
                f = 1;
            }
            if (dCheckIn < d) {
                f = 1;
            }
            if (dCheckOt < d) {
                f = 1;
            }
        }
        if (f == 1)
            return false;
        else
            return true;
    };
    // The function checks if everything is correct and sends a request to insert the date into the DB
    DateComponent.prototype.rentCar = function () {
        var _this = this;
        this.rent.email = localStorage.getItem('token');
        this.rent.serialNumber = this.carSerialnumber;
        this.rent.img = this.car[0].img;
        this.rent.KM = this.car[0].KM;
        this.rent.type = this.car[0].type;
        this.rent.price = this.car[0].price;
        if (this.checkRent()) {
            this.rentService.postRent(this.rent).subscribe(function (res) {
                _this.getRents();
                _this.showSuccssMessage = true;
                setTimeout(function () { return _this.showSuccssMessage = false; }, 2000);
            });
            this.car[0].views++;
            this.carservice.putCar(this.car[0]).subscribe(function (data) {
                _this.refreshCars();
            });
        }
        else {
            this.showErrorMessage = true;
            setTimeout(function () { return _this.showErrorMessage = false; }, 2000);
        }
    };
    DateComponent = __decorate([
        core_1.Component({
            selector: 'app-date',
            templateUrl: './date.component.html',
            styleUrls: ['./date.component.css']
        })
    ], DateComponent);
    return DateComponent;
}());
exports.DateComponent = DateComponent;
