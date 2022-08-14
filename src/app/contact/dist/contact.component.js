"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContactComponent = void 0;
var core_1 = require("@angular/core");
var message_model_1 = require("../models/message.model");
var ContactComponent = /** @class */ (function () {
    function ContactComponent(contactservice) {
        this.contactservice = contactservice;
        this.contact = [];
        this.message = new message_model_1.Message();
        this.showmassege = false;
        this.showMassegeError = false;
    }
    ContactComponent.prototype.ngOnInit = function () {
        this.refreshcontactList();
    };
    // The function retrieves the details of the Contact page.
    ContactComponent.prototype.refreshcontactList = function () {
        var _this = this;
        this.contactservice.getcontactinfo().subscribe(function (res) {
            _this.contact = res;
        });
    };
    // A function checks if the user has successfully entered the details of the message he wants to send, if so, then move on to the next function.
    ContactComponent.prototype.checkMessage = function (message) {
        if (message.name.length > 2 && message.email.endsWith('m')) {
            return true;
        }
        return false;
    };
    // Sending a message to the site administrator, the function continues what the previous function did and sends the message to the server for testing.
    ContactComponent.prototype.addMessage = function () {
        var _this = this;
        this.message.email = localStorage.getItem('token');
        if (this.checkMessage(this.message) == true) {
            this.contactservice.postMessage(this.message).subscribe(function (res) {
                _this.refreshcontactList();
                _this.showmassege = true;
                setTimeout(function () {
                    _this.showmassege = false;
                }, 3000);
            });
        }
        else {
            this.showMassegeError = true;
            setTimeout(function () {
                _this.showMassegeError = false;
            }, 3000);
        }
    };
    ContactComponent = __decorate([
        core_1.Component({
            selector: 'app-contact',
            templateUrl: './contact.component.html',
            styleUrls: ['./contact.component.css']
        })
    ], ContactComponent);
    return ContactComponent;
}());
exports.ContactComponent = ContactComponent;
