import { Component, ViewChild } from "@angular/core";
import { MakePaymentComponent } from "../../../business/payment/components/make-payment.component";

@Component({
  selector: "mc-subscription",
  templateUrl: "./subscription.component.html",
  styleUrls: [("./subscription.component.scss")]
})
export class SubscriptionComponent {
    @ViewChild(MakePaymentComponent) paymentForm: MakePaymentComponent;

    private getForm() {
        this.paymentForm.handlePayment();
    }
}