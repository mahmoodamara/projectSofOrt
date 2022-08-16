"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var user_model_1 = require("../models/user.model");
var core_2 = require("@angular/core");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, router, usersservise) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.usersservise = usersservise;
        this.showErrorMessage = false;
        this.image = "assets/img/3071357.jpg";
        this.user = [];
        this.newUser = new user_model_1.User();
        this.enterCode = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.createaddform();
        this.getUser();
        localStorage.getItem('token');
    };
    LoginComponent.prototype.getUser = function () {
        var _this = this;
        this.usersservise.getUser().subscribe(function (res) {
            _this.user = res;
            _this.newUser = _this.user[0];
        });
    };
    //The function initializes the variables that want them to login and gives them the conditions to meet.
    LoginComponent.prototype.createaddform = function () {
        this.loginForm = this.formBuilder.group({
            email: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8)]]
        });
    };
    //The function checks the details entered by the user and checks them to see if the situation is correct, they are put on the home page, if not, an error message is given.
    LoginComponent.prototype.onSubmitLogin = function () {
        var _this = this;
        this.usersservise.loginUser(this.loginForm.value)
            .subscribe(function (res) {
            localStorage.setItem('token', _this.loginForm.value.email);
            _this.usersservise.getUser();
            if (_this.loginForm.value.email != 'admin@gmail.com') {
                _this.router.navigate(['home']).then(function () {
                    window.location.reload();
                });
            }
            else {
                _this.router.navigate(['/sidebar-Admin']);
            }
        }, function (err) {
            console.log(err);
            _this.showErrorMessage = true;
            setTimeout(function () { return _this.showErrorMessage = false; }, 2000);
        });
    };
    LoginComponent.prototype.sendEmail = function () {
        var _this = this;
        if (this.email.length > 0) {
            this.usersservise.Sendemail(this.email).subscribe((function (res) {
                localStorage.setItem('token', _this.email);
                _this.code = res.rand;
            }));
            this.enterCode = true;
        }
    };
    LoginComponent.prototype.courrectCode = function () {
        var code = this.num1 + "" + this.num2 + "" + this.num3 + "" + this.num4;
        return (Number(code));
    };
    LoginComponent.prototype.checkCodeAndchangePassword = function () {
        if (this.courrectCode() == this.code) {
            this.newUser.password = this.password;
            this.usersservise.putUser(this.newUser).subscribe(function (res) {
                console.log("update");
            });
        }
    };
    LoginComponent.prototype.goToSignUp = function () {
        this.router.navigate(['/signup']);
    };
    __decorate([
        core_2.ViewChild('loginRef', { static: true })
    ], LoginComponent.prototype, "loginElement");
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['../signup/signup.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
