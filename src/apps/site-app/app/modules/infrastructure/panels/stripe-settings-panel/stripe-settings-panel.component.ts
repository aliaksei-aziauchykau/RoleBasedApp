import { Component, OnInit, Input } from "@angular/core";
import { StripeInfoModel } from "../../../../models/stripe.view.models";
import { SettingsService } from "../../../../services/settings.service";
import { DataStorageService } from "../../../../services/data-storage.service";
import { SafeComponent } from "../../../../utils/safe-component.abstract";
import { check } from "../../../../utils/custom-operators";
@Component({
    selector: "mc-stripe-settings-panel",
    templateUrl: "./stripe-settings-panel.component.html",
    styleUrls: ["./stripe-settings-panel.component.scss"]
})
export class StripeSettingsPanelComponent extends SafeComponent implements OnInit {

    private readonly applicationId: string = "client_id=ca_D5eeZa4K7p5LDsVOwppZRp7auJbo9Vsl&redirect_uri=http://localhost:3001/user";
    private readonly stripeLinkBase: string = "https://connect.stripe.com/oauth/authorize?response_type=code&scope=read_write";

    private readonly stripeLink: string;

    private stripeInfo: StripeInfoModel;

    constructor(private readonly settingsService: SettingsService,
        private readonly dataStorageService: DataStorageService) {
        super();
        this.stripeLink = this.buildStripeLink();
     }

    ngOnInit(): void {
        this.dataStorageService.stripeInfoCurrent
            .pipe(
                check(this.unsubscriber, this.stripeInfo, x => this.stripeInfo = x)
            )
            .subscribe();
    }

    private buildStripeLink(): string {
        const result: string = `${this.stripeLinkBase}&client_id=${this.settingsService.settings.stripeAppKey}&redirect_uri=${this.settingsService.settings.stripeRedirectPath}`;
        return result;
    }
}
