import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";
import { Router, Params } from '@angular/router';
import {LoginService} from "../../services/login.service";

@Component({
    selector: 'user-login',
    templateUrl: './app/components/login/login.component.html'
})

export class LoginComponent implements OnInit {
    @Input() user: User;
    error: any;
    navigated = false; // true if navigated here


    constructor(
        private loginService: LoginService,
        private router: Router) {
    }

    ngOnInit() {
        this.user = new User();
    }

    login() {
        this.gotoUsersDetail();
        // this.loginService
        // .login(this.user)
        // .then(user => {
        //     this.user = user; // login user
            
        // })
        // .catch(error => this.error = error); // TODO: Display error message
    }

    gotoUsersDetail() {
        this.router.navigate(['/users']);
    }


    goBack() {
        window.history.back();
    }
}