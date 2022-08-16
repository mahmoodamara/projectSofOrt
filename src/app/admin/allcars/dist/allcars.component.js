"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AllcarsComponent = void 0;
var core_1 = require("@angular/core");
var cars_model_1 = require("src/app/models/cars.model");
var AllcarsComponent = /** @class */ (function () {
    function AllcarsComponent(carservice) {
        this.carservice = carservice;
        this.allCars = [];
        this.car = new cars_model_1.Cars();
        this.showSuccssMessage = false;
    }
    AllcarsComponent.prototype.ngOnInit = function () {
        this.getAllCars();
    };
    AllcarsComponent.prototype.getAllCars = function () {
        var _this = this;
        this.carservice.getCars().subscribe(function (data) {
            _this.allCars = data;
            console.log(_this.allCars);
        });
    };
    AllcarsComponent.prototype.editCar = function (car) {
        this.car = car;
    };
    AllcarsComponent.prototype.postCar = function () {
        var _this = this;
        this.carservice.postCar(this.car).subscribe(function (res) {
            _this.getAllCars();
            _this.showSuccssMessage = true;
            setTimeout(function () { return _this.showSuccssMessage = false; }, 2000);
        });
    };
    AllcarsComponent.prototype.putCar = function () {
        var _this = this;
        this.carservice.putCar(this.car).subscribe(function (res) {
            _this.showSuccssMessage = true;
            setTimeout(function () { return _this.showSuccssMessage = false; }, 2000);
        });
    };
    AllcarsComponent.prototype.deleteCar = function (_id) {
        var _this = this;
        if (confirm('Are you sure to delete this record ?') == true) {
            this.carservice.deleteCar(_id).subscribe(function (res) {
                _this.getAllCars();
            });
        }
    };
    AllcarsComponent = __decorate([
        core_1.Component({
            selector: 'app-allcars',
            templateUrl: './allcars.component.html',
            styleUrls: ['../admin-action/admin-action.component.css']
        })
    ], AllcarsComponent);
    return AllcarsComponent;
}());
exports.AllcarsComponent = AllcarsComponent;
