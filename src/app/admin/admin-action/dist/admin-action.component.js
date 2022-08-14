"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminActionComponent = void 0;
var core_1 = require("@angular/core");
var action_model_1 = require("src/app/models/action.model");
var usersAction_1 = require("src/app/models/usersAction");
var AdminActionComponent = /** @class */ (function () {
    function AdminActionComponent(acutionservice) {
        this.acutionservice = acutionservice;
        this.auctions = [];
        this.auction = new action_model_1.Auction();
        this.userAuction = new usersAction_1.UsersAuction("", 0, 0, this.auction);
        this.users = [];
        this.showSuccssMessage = false;
    }
    AdminActionComponent.prototype.ngOnInit = function () {
        this.getCarsAuction();
    };
    // The function retrieves the vehicles that have an auction.
    AdminActionComponent.prototype.getCarsAuction = function () {
        var _this = this;
        this.acutionservice.getactioninfo().subscribe(function (data) {
            _this.auctions = data;
            _this.auction.serialNumber = _this.auctions[_this.auctions.length - 1].serialNumber + 1;
        });
    };
    // The function pulls out the users who were tempted by the Auction that we selected according to the SerialNumber.
    AdminActionComponent.prototype.getUserInAuction = function (serialNumber) {
        var _this = this;
        this.acutionservice.getUsersInAuction(serialNumber).subscribe(function (data) {
            _this.users = data;
            console.log(_this.users);
        });
    };
    // A function for adding a car to the auction.
    AdminActionComponent.prototype.postCarAuction = function () {
        var _this = this;
        this.auction.timeAction = this.editDateAdd(this.auction.timeAction);
        this.acutionservice.PostCarAuction(this.auction).subscribe(function (res) {
            _this.getCarsAuction();
        });
    };
    // A function receives a time and returns it in a different form.
    AdminActionComponent.prototype.editDate = function (date) {
        var d = new Date(date);
        var time = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        return time;
    };
    // A function receives an Auction to start its update
    AdminActionComponent.prototype.editCar = function (carAuction) {
        this.auction = carAuction;
    };
    AdminActionComponent.prototype.editUserAuction = function (user) {
        this.userAuction = user;
    };
    // A function that sends a request to the Server to update the Auction
    AdminActionComponent.prototype.putCarAuction = function () {
        var _this = this;
        this.acutionservice.putAuction(this.auction).subscribe(function (res) {
            _this.getCarsAuction();
            alert("update");
        });
    };
    AdminActionComponent.prototype.putUserAuction = function () {
        var _this = this;
        this.acutionservice.putUserAuction(this.userAuction).subscribe(function (res) {
            console.log("update");
            _this.showSuccssMessage = true;
            setTimeout(function () { return _this.showSuccssMessage = false; }, 2000);
            _this.getUserInAuction(_this.userAuction.carNumber);
        });
    };
    // A function that sends a request to the server to delete an auction
    AdminActionComponent.prototype.deleteCarAuction = function (_id) {
        var _this = this;
        if (confirm('Are you sure to delete this record ?') == true) {
            this.acutionservice.deleteCarAuction(_id).subscribe(function (res) {
                _this.getCarsAuction();
                alert("delete");
            });
        }
    };
    AdminActionComponent.prototype.deleteUserInCarAuction = function (_id, carNumber) {
        var _this = this;
        if (confirm('Are you sure to delete this record ?') == true) {
            this.acutionservice.deleteUserInCarAuction(_id).subscribe(function (res) {
                _this.getCarsAuction();
                _this.getUserInAuction(carNumber);
            });
        }
    };
    AdminActionComponent.prototype.editDateAdd = function (date) {
        //8 13,2022 16:48:10
        var d = new Date(date);
        var time = d.getMonth() + 1 + " " + d.getDate() + "," + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":10";
        return time;
    };
    AdminActionComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-action',
            templateUrl: './admin-action.component.html',
            styleUrls: ['./admin-action.component.css']
        })
    ], AdminActionComponent);
    return AdminActionComponent;
}());
exports.AdminActionComponent = AdminActionComponent;
