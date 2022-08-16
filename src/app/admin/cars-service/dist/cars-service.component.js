"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarsServiceComponent = void 0;
var core_1 = require("@angular/core");
var CarsServiceComponent = /** @class */ (function () {
    function CarsServiceComponent(treatmentService) {
        this.treatmentService = treatmentService;
        this.treatment = [];
    }
    CarsServiceComponent.prototype.ngOnInit = function () {
        this.refreshtreatmentList();
    };
    CarsServiceComponent.prototype.refreshtreatmentList = function () {
        var _this = this;
        this.treatmentService.getTreatmentList().subscribe(function (res) {
            _this.treatment = res;
        });
    };
    CarsServiceComponent.prototype.deleteCarService = function (_id) {
        var _this = this;
        if (confirm('Are you sure to delete this record ?') == true) {
            this.treatmentService.deleteCarService(_id).subscribe(function (res) {
                _this.refreshtreatmentList();
            });
            this.refreshtreatmentList();
        }
    };
    CarsServiceComponent = __decorate([
        core_1.Component({
            selector: 'app-cars-service',
            templateUrl: './cars-service.component.html',
            styleUrls: ['../admin-action/admin-action.component.css']
        })
    ], CarsServiceComponent);
    return CarsServiceComponent;
}());
exports.CarsServiceComponent = CarsServiceComponent;
