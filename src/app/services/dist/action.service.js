"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ActionService = void 0;
var core_1 = require("@angular/core");
var usersAction_1 = require("../models/usersAction");
var ActionService = /** @class */ (function () {
    function ActionService(http) {
        this.http = http;
        this.email = localStorage.getItem('token');
        this.baseURL = 'http://localhost:3000/api/action';
        this.baseURLUsers = 'http://localhost:3000/api/usersaction';
        this.baseURLAuction = 'http://localhost:3000/api/action/id';
        this.baseURLMaxPrice = 'http://localhost:3000/api/maxUsersaction';
        this.date = new Date();
        this.headers = { 'content-type': 'application/json' };
    }
    // A function continues the request to retrieve the Auctions and returns the information we will use.
    ActionService.prototype.getactioninfo = function () {
        return this.http.get(this.baseURL);
    };
    // A function continues the request to retrieve information for a single Auction according to its SerialNumber, and returns the information we will use.
    ActionService.prototype.getOneActionInfo = function (serialNumber) {
        return this.http.get(this.baseURL + ("/" + serialNumber));
    };
    // A function continues the request to retrieve the highest price for a single auction
    ActionService.prototype.getMxPrice = function (serialNumber) {
        return this.http.get(this.baseURLMaxPrice + ("/" + serialNumber));
    };
    // Function continues the request to retrieve the users who participated in the Auction
    ActionService.prototype.getUsersInAuction = function (serialNumber) {
        return this.http.get(this.baseURLUsers + ("/" + serialNumber));
    };
    // A function continues the request to add a price to the Auction and transfer all the data to the DB
    ActionService.prototype.participateInTheAuction = function (bidValue, carNumber, Action) {
        var body = JSON.stringify(new usersAction_1.UsersAuction(this.email, bidValue, carNumber, Action));
        return this.http.post(this.baseURLUsers, body, {
            headers: this.headers
        });
    };
    // Function continues the request to add a new auction to the DB
    ActionService.prototype.PostCarAuction = function (Auction) {
        var body = JSON.stringify(Auction);
        return this.http.post(this.baseURL, body, {
            headers: this.headers
        });
    };
    // Function continues the request to updateAuction in DB
    ActionService.prototype.putAuction = function (ac) {
        return this.http.put(this.baseURL + ("/" + ac._id), ac);
    };
    ActionService.prototype.putUserAuction = function (user) {
        return this.http.put(this.baseURLUsers + ("/" + user._id), user);
    };
    // Function continues the request to delete Auction from DB
    ActionService.prototype.deleteCarAuction = function (_id) {
        return this.http["delete"](this.baseURL + ("/" + _id));
    };
    ActionService.prototype.deleteUserInCarAuction = function (_id) {
        return this.http["delete"](this.baseURLUsers + ("/" + _id));
    };
    ActionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ActionService);
    return ActionService;
}());
exports.ActionService = ActionService;
