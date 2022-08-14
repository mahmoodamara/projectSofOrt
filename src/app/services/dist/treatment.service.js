"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TreatmentService = void 0;
var core_1 = require("@angular/core");
var TreatmentService = /** @class */ (function () {
    function TreatmentService(http) {
        this.http = http;
        this.baseURL = 'http://localhost:3000/api/treatment';
    }
    // 
    TreatmentService.prototype.getTreatmentList = function () {
        return this.http.get(this.baseURL);
    };
    TreatmentService.prototype.deleteCarService = function (_id) {
        return this.http["delete"](this.baseURL + ("/" + _id));
    };
    TreatmentService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TreatmentService);
    return TreatmentService;
}());
exports.TreatmentService = TreatmentService;
