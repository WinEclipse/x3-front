import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { Router, Params } from '@angular/router';
import { LoginService } from "../../services/login.service";
import { AppComponent } from "../../app.component";


@Component({
    selector: 'user-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    user: User;
    error: any;
    navigated = false; // true if navigated here

    constructor(
        private loginService: LoginService,
        private app: AppComponent,
        private router: Router) {
    }

    ngOnInit() {
        this.user = new User();
    }

    login() {
        this.loginService
            .login(this.user)
            .subscribe(
            (res) => {
                console.log("login", res);
                if (1001 != res.status || !res.data.token) {
                    alert('登录失败');
                } else {
                    this.app.setStorage("token", res.data.token);
                    this.gotoUsersDetail();
                }
            },
            (error) => {
                alert('Something went Wrong');
            }
            );
    }

    gotoUsersDetail() {
        this.router.navigate(['/student']);
    }


    goBack() {
        window.history.back();
    }
}