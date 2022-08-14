"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersService = void 0;
var core_1 = require("@angular/core");
var email_model_1 = require("../models/email.model");
var UsersService = /** @class */ (function () {
    function UsersService(http, router) {
        this.http = http;
        this.router = router;
        this.baseURL = 'http://localhost:3000/api/users';
        this.email = localStorage.getItem('token');
        this.url = "/shearchofemail?email=" + this.email;
        this.headers = { 'content-type': 'application/json' };
    }
    // Function continues the request to add a new user
    UsersService.prototype.PostUser = function (user) {
        return this.http.post(this.baseURL + '/signup', user, {
            headers: this.headers
        });
    };
    // Function continues the request from Admin to add a new user
    UsersService.prototype.addUser = function (user) {
        return this.http.post(this.baseURL, user, {
            headers: this.headers
        });
    };
    // A function continues the request from the user to check the data and confirm to enter the website
    UsersService.prototype.loginUser = function (user) {
        return this.http.post(this.baseURL + '/login', user, {
            headers: this.headers
        });
    };
    // A function continues the request to retrieve the information of a single user
    UsersService.prototype.getUser = function () {
        return this.http.get(this.baseURL + this.url);
    };
    // A function returns the user's token
    UsersService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    // A function continues a request to retrieve the information of all users and returns saved
    UsersService.prototype.getUsers = function () {
        return this.http.get(this.baseURL);
    };
    // Function continues the request to update a user in the DB
    UsersService.prototype.putUser = function (user) {
        return this.http.put(this.baseURL + ("/newPassword/" + user._id), user);
    };
    UsersService.prototype.putUserProfile = function (user) {
        return this.http.put(this.baseURL + ("/" + user._id), user);
    };
    //Function continues the request to delete a user from DB
    UsersService.prototype.deleteUser = function (_id) {
        return this.http["delete"](this.baseURL + ("/" + _id));
    };
    UsersService.prototype.Sendemail = function (email) {
        var body = JSON.stringify(new email_model_1.Email(email));
        return this.http.post(this.baseURL + "/sendEmail", body, {
            headers: this.headers
        });
    };
    UsersService.prototype.logout = function () {
        localStorage.removeItem('token');
        localStorage.clear();
        this.router.navigate(['login']);
    };
    UsersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
