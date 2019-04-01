import { Component, OnInit, HostListener } from "@angular/core";
import { PaymentService } from "../services/payment.service";
import { SettingsService } from "../../../../services/settings.service";

@Component({
    selector: "mc-make-payment",
    templateUrl: "./make-payment.component.html",
    styleUrls: ["./make-payment.component.scss"]
})
export class MakePaymentComponent implements OnInit {
    private handler: any;

    constructor(
        private readonly settingsService: SettingsService,
        private readonly paymentService: PaymentService) { }

    @HostListener("window:popstate")
    private onPopstate(): void {
        this.handler.close();
    }

    ngOnInit(): void {
        this.handler = StripeCheckout.configure({
            key: this.settingsService.settings.stripePublicKey,
            locale: "auto",
            token: (token: any) => this.paymentService.charge({
                description: "ball",
                currency: "usd",
                amount: 500
            },
            token)
        });
    }

    handlePayment(): void {
        this.handler.open({
            name: "My name",
            description: "Deposit",
            amount: 500
        });
    }


}
