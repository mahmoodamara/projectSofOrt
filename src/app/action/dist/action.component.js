"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ActionComponent = void 0;
var core_1 = require("@angular/core");
var ActionComponent = /** @class */ (function () {
    function ActionComponent(acutionservice, formBuilder, actRouter) {
        this.acutionservice = acutionservice;
        this.formBuilder = formBuilder;
        this.actRouter = actRouter;
        this.auctions = [];
        this.bidValue = 0;
        this.maxPriceArray = [];
        this.timeAuction = '';
        this.showSuccssMessage = false;
        this.showErrorMessage = false;
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }
    ActionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.carSerialnumber = this.actRouter.snapshot.params['serialNumber'];
        this.getCarAuction();
        this.getMaxPrice();
        this.timer();
        setInterval(function () {
            _this.serial = _this.getCarAuction();
            _this.max = _this.getMaxPrice();
        }, 500);
    };
    ActionComponent.prototype.ngOnDestroy = function () {
        if (this.serial) {
            clearInterval(this.serial);
            clearInterval(this.max);
        }
    };
    // The function retrieves the Auction details according to the SerialNumber that we sent with it by clicking on the Auction button that we selected
    ActionComponent.prototype.getCarAuction = function () {
        var _this = this;
        this.acutionservice.getOneActionInfo(this.carSerialnumber).subscribe(function (data) {
            _this.auctions = data;
            _this.timeAuction = _this.auctions[0].timeAction;
            _this.maxPrice = _this.auctions[0].maxPrice;
            _this.minPrice = _this.auctions[0].minPrice;
            _this.carType = _this.auctions[0].carType;
            _this.isButtonVisible = _this.auctions[0].isButtonVisible;
        });
    };
    // The function retrieves the maximum price added to the Auction
    ActionComponent.prototype.getMaxPrice = function () {
        var _this = this;
        this.acutionservice.getMxPrice(Number(this.carSerialnumber)).subscribe(function (data) {
            _this.maxPriceArray = data;
            if (_this.maxPriceArray.length > 0) {
                _this.bidValue = _this.maxPriceArray[0].bidValue;
            }
        });
    };
    // The function checks the price the user wants to add
    ActionComponent.prototype.checkPrice = function () {
        if (this.priceAdd > this.minPrice && this.priceAdd < this.maxPrice && this.priceAdd > this.bidValue + 50) {
            return true;
        }
        return false;
    };
    // The function transfers the price and the user's details to the server after the tests
    ActionComponent.prototype.addPrice = function () {
        var _this = this;
        if (this.checkPrice()) {
            this.acutionservice.participateInTheAuction(this.priceAdd, (this.carSerialnumber), this.auctions[0]).subscribe(function (res) {
            });
            this.showSuccssMessage = true;
            setTimeout(function () { return _this.showSuccssMessage = false; }, 2000);
        }
        else {
            this.showErrorMessage = true;
            setTimeout(function () { return _this.showErrorMessage = false; }, 2000);
        }
        this.getCarAuction();
        this.getMaxPrice();
    };
    // The function returns the time left for the auction
    ActionComponent.prototype.timer = function () {
        var _this = this;
        var myfunc = setInterval(function () {
            var countDownDate = new Date(_this.timeAuction).getTime();
            var now = new Date().getTime();
            var timeleft = countDownDate - now;
            _this.days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            _this.hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            _this.minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            _this.seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            if (timeleft < 0) {
                _this.days = 0;
                _this.minutes = 0;
                _this.hours = 0;
                _this.seconds = 0;
                _this.getCarAuction();
            }
        }, 1000);
    };
    ActionComponent = __decorate([
        core_1.Component({
            selector: 'app-action',
            templateUrl: './action.component.html',
            styleUrls: ['./action.component.css']
        })
    ], ActionComponent);
    return ActionComponent;
}());
exports.ActionComponent = ActionComponent;
