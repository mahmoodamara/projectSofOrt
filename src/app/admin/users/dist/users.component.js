"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersComponent = void 0;
var core_1 = require("@angular/core");
var user_model_1 = require("src/app/models/user.model");
var UsersComponent = /** @class */ (function () {
    function UsersComponent(userService) {
        this.userService = userService;
        this.users = [];
        this.user = new user_model_1.User();
        this.collapsed = false;
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.refreshUsersList();
    };
    // The function retrieves the information of the website users.
    UsersComponent.prototype.refreshUsersList = function () {
        var _this = this;
        this.userService.getUsers().subscribe(function (res) {
            _this.users = res;
        });
    };
    // A function to request the addition of a new user.
    UsersComponent.prototype.postUser = function () {
        var _this = this;
        this.userService.addUser(this.user).subscribe(function (res) {
            _this.refreshUsersList();
            alert("add");
        });
    };
    // Function to request user deleted.
    UsersComponent.prototype.onDelete = function (_id) {
        var _this = this;
        if (confirm('Are you sure to delete this record ?') == true) {
            this.userService.deleteUser(_id).subscribe(function (res) {
                _this.refreshUsersList();
            });
        }
    };
    // A function to start a user for updating.
    UsersComponent.prototype.editUser = function (user) {
        this.user = user;
    };
    // A function to request an existing user update.
    UsersComponent.prototype.putUser = function () {
        var _this = this;
        this.userService.putUser(this.user).subscribe(function (res) {
            _this.refreshUsersList();
            alert("updating");
        });
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'app-users',
            templateUrl: './users.component.html',
            styleUrls: ['./users.component.css']
        })
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
