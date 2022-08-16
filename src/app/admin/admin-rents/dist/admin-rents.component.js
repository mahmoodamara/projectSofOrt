"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminRentsComponent = void 0;
var core_1 = require("@angular/core");
var rent_model_1 = require("src/app/models/rent.model");
var AdminRentsComponent = /** @class */ (function () {
    function AdminRentsComponent(rentService) {
        this.rentService = rentService;
        this.rents = [];
        this.oneRent = [];
        this.rent = new rent_model_1.Rent();
        this.userRent = new rent_model_1.Rent();
    }
    AdminRentsComponent.prototype.ngOnInit = function () {
        this.refreshRentList();
        this.getCarRent(1);
    };
    // A function that retrieves details on rental cars.
    AdminRentsComponent.prototype.refreshRentList = function () {
        var _this = this;
        this.rentService.getCarRent().subscribe(function (res) {
            _this.rents = res;
        });
    };
    // The function retrieves the trainings of the selected vehicle.
    AdminRentsComponent.prototype.getCarRent = function (serialNumber) {
        var _this = this;
        this.rentService.getOneRent(serialNumber).subscribe(function (data) {
            _this.oneRent = data[0].rent;
            _this.serial = serialNumber;
            _this.rent = _this.oneRent[0];
            console.log(_this.oneRent);
        });
    };
    // A function that sends a request to the server to delete a rental car
    AdminRentsComponent.prototype.deleteCarRent = function (id) {
        var _this = this;
        if (confirm('Are you sure to delete this record ?') == true) {
            this.rentService.deleteRent(id).subscribe(function (res) {
                _this.refreshRentList();
                alert("delete");
            });
        }
    };
    // A function that sends a request to the server to delete a rental car user.
    AdminRentsComponent.prototype.deleteOneUserRent = function () {
        var _this = this;
        if (confirm('Are you sure to delete this record ?') == true) {
            this.rentService.deleteOneUserRent(this.rent.email, this.serial).subscribe(function (res) {
                _this.getCarRent(1);
                _this.refreshRentList();
            });
        }
    };
    AdminRentsComponent.prototype.editUser = function (user) {
        this.rent = user;
    };
    AdminRentsComponent.prototype.putUserAuction = function () {
        var _this = this;
        this.rentService.putUserAuction(this.rent).subscribe(function (res) {
            _this.getCarRent(_this.rent.serialNumber);
        });
    };
    AdminRentsComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-rents',
            templateUrl: './admin-rents.component.html',
            styleUrls: ['../admin-action/admin-action.component.css']
        })
    ], AdminRentsComponent);
    return AdminRentsComponent;
}());
exports.AdminRentsComponent = AdminRentsComponent;
