"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(formBuilder, usersservise, router) {
        this.formBuilder = formBuilder;
        this.usersservise = usersservise;
        this.router = router;
        this.arr = [];
        this.showSucessMessage = false;
        this.image = "assets/img/3071357.jpg";
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.createaddformSignUp();
    };
    //The function initializes the variables that want them to login and gives them the conditions to meet.
    SignupComponent.prototype.createaddformSignUp = function () {
        this.signupForm = this.formBuilder.group({
            username: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8)]],
            phone: ['', [forms_1.Validators.required, forms_1.Validators.minLength(9)]]
        });
    };
    //The function checks the details entered by the user and checks them to see if the situation is correct. Enter the LOGIN page, if it does not give an error message.
    SignupComponent.prototype.onSubmitSignUp = function () {
        var _this = this;
        this.usersservise.PostUser(this.signupForm.value)
            .subscribe(function (data) {
            console.log(typeof (_this.signupForm.value.phone));
            localStorage.setItem('token', data.token);
            _this.showSucessMessage = true;
            setTimeout(function () { return _this.showSucessMessage = false; }, 2000);
            _this.signupForm.reset();
        }, function () {
            alert("Somthing went wrong");
        });
    };
    SignupComponent.prototype.goToLogIn = function () {
        this.router.navigate(['/login']);
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.css']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
