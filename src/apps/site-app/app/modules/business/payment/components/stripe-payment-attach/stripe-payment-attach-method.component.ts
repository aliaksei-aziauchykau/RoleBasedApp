import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from "@angular/core";
import { SettingsService } from "../../../../../services/settings.service";
import { ValueChecker } from "../../../../../utils/value-checker.utils";

export class StripeAttachmentSettings {
    public isPaymentNameEnabled: boolean;
    public isEmailEnabled: boolean;

    constructor(data: StripeAttachmentSettings) {
        this.isEmailEnabled = ValueChecker.getValue(data && data.isEmailEnabled, false);
        this.isPaymentNameEnabled = ValueChecker.getValue(data && data.isPaymentNameEnabled, false);
    }
}

@Component({
    selector: "mc-stripe-payment-attach-method",
    templateUrl: "./stripe-payment-attach-method.component.html",
    styleUrls: ["./stripe-payment-attach-method.component.scss"]
})
export class StripePaymentAttachMethodComponent implements OnInit, AfterViewInit {

    @Input() settings?: StripeAttachmentSettings;
    @Output() onToken: EventEmitter<{}> = new EventEmitter();

    private readonly elements: any;
    private readonly stripe: any;
    public email: string;
    public paymentName: string;
    private card: any;

    private message: string = null;

    private defaultStyles = {
        base: {
            color: "#32325d",
            lineHeight: "18px",
            fontFamily: "\"Helvetica Neue\", Helvetica, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    };

    constructor(private readonly settingsService: SettingsService) {
        this.stripe = Stripe(this.settingsService.settings.stripePublicKey);
        this.elements = this.stripe.elements();
    }

    ngOnInit(): void {
        this.settings = new StripeAttachmentSettings(this.settings);
        this.setupStripeCard();
    }

    ngAfterViewInit(): void {
        this.bindStripeCard();
    }

    setupStripeCard(): void {
        this.card = this.elements.create("card", { style: this.defaultStyles });
    }

    bindStripeCard(): void {
        setTimeout(() => this.card.mount("#card-element"), 2000);
    }

    changeOnCard(event: any) {
        this.changeMessage(event);
    }

    changeMessage(obj: any) {
        this.message = obj.error && obj.error.message || null;
    }

    submitOnForm(event: any) {
        event.preventDefault();

        this.stripe.createToken(this.card)
            .then((result: any) => {
                if (result.error) {
                    this.changeMessage(event);
                } else {
                    this.onToken.emit({
                        token: result.token.id,
                        email: this.email,
                        paymentName: this.paymentName
                    });
                }
            });
    }
}
