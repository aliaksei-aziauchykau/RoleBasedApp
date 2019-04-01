import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { tap, takeUntil } from "rxjs/operators";
import { SafeComponent } from "../../../../../utils/safe-component.abstract";
import { ItemPopupModel } from "../../models";
import { PopupService } from "../../../../../services/popup.service";

@Component({
    selector: "mc-times-popup",
    templateUrl: "./times-popup.component.html",
    styleUrls: ["./times-popup.component.scss"]
})
export class TimesPopupComponent extends SafeComponent implements OnInit, OnDestroy {
    public messages: ItemPopupModel[] = [];
    public subscriptions: Subscription[] = [];

    constructor(private readonly popupService: PopupService) {
        super();
    }

    ngOnInit(): void {
        this.popupService.messages
            .pipe(
                takeUntil(this.unsubscriber),
                tap(messages => this.messages = messages)
            )
            .subscribe();
    }
}
