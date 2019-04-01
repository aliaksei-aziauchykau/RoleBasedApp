import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthResponseModel } from "../../../../models/auth-response.model";
import { LoginInfoModel } from "../../../../models/login-info.model";
import { AuthHttpService } from "../../../../services/http-services/auth.http.service";

@Component({
    selector: "mc-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {

    private loginInfo: LoginInfoModel = new LoginInfoModel();
    private error: string = null;

    constructor(
        private readonly authHttpService: AuthHttpService,
        private readonly router: Router
    ) {
    }

    private login() {
        this.authHttpService.login({
            email: this.loginInfo.email,
            password: this.loginInfo.password
        }).subscribe(
            data => this.success(data),
            error => this.error = error
        );
    }

    private success(response: AuthResponseModel) {
        this.error = response.error || null;
        if (response.isAuth) {
            this.router.navigate(["/user"]);
        }
    }

    ngOnInit(): void { }
}
