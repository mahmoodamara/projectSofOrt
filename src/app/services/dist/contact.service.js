"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContactService = void 0;
var core_1 = require("@angular/core");
var ContactService = /** @class */ (function () {
    function ContactService(http) {
        this.http = http;
        this.baseURLContacts = 'http://localhost:3000/api/contacts';
        this.baseURLMessage = 'http://localhost:3000/api/messages';
        this.headers = { 'content-type': 'application/json' };
    }
    //A function continues the request to retrieve the information to the Contact page and returns the information we will use
    ContactService.prototype.getcontactinfo = function () {
        return this.http.get(this.baseURLContacts);
    };
    // Function continues the request to add a new message
    ContactService.prototype.postMessage = function (message) {
        return this.http.post(this.baseURLMessage, message);
    };
    ContactService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ContactService);
    return ContactService;
}());
exports.ContactService = ContactService;
