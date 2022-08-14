"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TeamComponent = void 0;
var core_1 = require("@angular/core");
var TeamComponent = /** @class */ (function () {
    function TeamComponent(teamservice) {
        this.teamservice = teamservice;
        this.imageteam1 = "assets/img/team-1.jpg";
        this.team = [];
    }
    TeamComponent.prototype.ngOnInit = function () {
        this.refreshTeamList();
    };
    //The function retrieves contact details on the site.
    TeamComponent.prototype.refreshTeamList = function () {
        var _this = this;
        this.teamservice.getteamtList().subscribe(function (res) {
            _this.team = res;
        });
    };
    TeamComponent = __decorate([
        core_1.Component({
            selector: 'app-team',
            templateUrl: './team.component.html',
            styleUrls: ['./team.component.css']
        })
    ], TeamComponent);
    return TeamComponent;
}());
exports.TeamComponent = TeamComponent;
