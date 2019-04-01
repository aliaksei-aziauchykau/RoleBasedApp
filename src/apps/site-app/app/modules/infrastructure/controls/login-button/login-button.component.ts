import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { SafeComponent } from "../../../../utils/safe-component.abstract";
import { HttpService } from "../../../../services/http.service";
import { SettingsService } from "../../../../services/settings.service";
import { Endpoints } from "../../../../../../../core/endpoints";
import { AuthHttpService } from "../../../../services/http-services/auth.http.service";

@Component({
    selector: "mc-login-button",
    templateUrl: "./login-button.component.html",
    styleUrls: ["./login-button.component.scss"]
})
export class LoginButtonComponent extends SafeComponent implements OnInit, OnDestroy {
    private readonly loginMessage: string = "Login";
    private readonly logoutMessage: string = "Logout";
    private message: string = null;
    private action: () => void = null;
    private logged: string;

    constructor(
        private readonly router: Router,
        private readonly authHttpService: AuthHttpService,
        private readonly settingsService: SettingsService
    ) {
        super();
    }

    ngOnInit(): void {
        this.settingsService.$cookie
            .takeUntil(this.unsubscriber)
            .filter(x => this.logged !== x.modelCookie.logged )
            .do(x => this.logged = x.modelCookie.logged)
            .do(x => this.recalculate())
            .subscribe(null, error => console.log("Login error"));
    }

    private recalculate() {
        this.message = this.logged === "true" ? this.logoutMessage : this.loginMessage;
        this.action = this.logged === "true" ? this.logoutAction : this.loginAction;
    }

    private loginAction() {
        this.router.navigate(["/login"]);
    }

    private logoutAction() {
        this.authHttpService.logout()
            .subscribe(
                (data) => this.logoutActionSucess(data),
                () => this.logoutActionError()
            );
    }

    private logoutActionSucess(data: any ) {
        this.navigateToHome();
    }

    private logoutActionError() {
        this.navigateToHome();
    }

    private navigateToHome() {
        this.router.navigate(["/home"]);
    }
}
