import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { UserInfoModel } from "../../../models/user.view.models";
import { Locker } from "../../../utils/locker";
import { LockerTypeEnum } from "../../../utils/locker-type.enum";

import { SafeComponent } from "../../../utils/safe-component.abstract";
import { CurrentUserHttpService } from "../../../services/http-services/current.user.http.service";
import { trackExecution } from "../../../utils/custom-operators";
import { mergeMap } from "rxjs/operators";

@Component({
    selector: "mc-user-page",
    templateUrl: "./user-page.component.html",
    styleUrls: ["./user-page.component.scss"]
})
export class UserPageComponent extends SafeComponent implements OnInit {
    private locker: Locker = new Locker().addLocker(LockerTypeEnum.HttpCall);
    constructor(
        private readonly currentUserHttpService: CurrentUserHttpService
    ) {
        super();
    }

    ngOnInit(): void {
        const source$ = this.currentUserHttpService.getSessionInfo();
        const chainFn$ = () => Observable.zip(
            this.currentUserHttpService.getProductInfo(),
            this.currentUserHttpService.getStripeInfo(),
            this.currentUserHttpService.getUserInfo()
        );
        source$
            .pipe(
                mergeMap(() => chainFn$()),
                trackExecution(LockerTypeEnum.HttpCall, this.locker)
            )
            .subscribe();
    }

    public get isSpinnerActive(): boolean {
        return this.locker.isLocked(LockerTypeEnum.HttpCall);
    }
}
