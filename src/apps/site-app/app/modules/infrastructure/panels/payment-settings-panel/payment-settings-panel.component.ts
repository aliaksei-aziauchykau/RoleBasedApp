import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../../../../services/data-storage.service";
import { check } from "../../../../utils/custom-operators";
import { SafeComponent } from "../../../../utils/safe-component.abstract";
import { StripeInfoModel } from "../../../../models/stripe.view.models";
import { StripeAttachmentSettings } from "../../../business/payment/components/stripe-payment-attach/stripe-payment-attach-method.component";
import { StripeHttpService } from "../../../../services/http-services/stripe.http.service";
import { CreatePaymentMethodRequest } from "../../../../models/requests/create-payment-method.request";
import { GenericListItem } from "../../controls/models/generic-list-item.model";
import { CurrentUserHttpService } from "../../../../services/http-services/current.user.http.service";

@Component({
    selector: "mc-payment-settings-panel",
    templateUrl: "./payment-settings-panel.component.html",
    styleUrls: ["./payment-settings-panel.component.scss"]
})
export class PaymentSettingsPanelComponent extends SafeComponent implements OnInit {

    private stripeInfo: StripeInfoModel;
    public payments: GenericListItem[] = [];

    public paymentSettings: StripeAttachmentSettings = <StripeAttachmentSettings>{
        isPaymentNameEnabled: true,
    };

    constructor(
        private readonly dataStorageService: DataStorageService,
        private readonly stripeHttpService: StripeHttpService,
        private readonly currentUserHttpService: CurrentUserHttpService,
    ) {
        super();
    }

    ngOnInit(): void {
        // this.dataStorageService.stripeInfoCurrent
        //     .pipe(
        //         check(this.unsubscriber, this.stripeInfo, x => {
        //             this.stripeInfo = x;
        //             this.payments = x.paymentMethods.map(p => new GenericListItem(p));
        //         })
        //     )
        //     .subscribe();

    }

    public onToken(data: any): void {
        console.log(data);

        const {
            paymentName,
            token: paymentToken
        } = data;

        this.stripeHttpService.createPaymentMethodStripe(<CreatePaymentMethodRequest>{
            paymentName,
            paymentToken
        }).flatMap(() => this.currentUserHttpService.getStripeInfo())
        .subscribe();
    }
}
