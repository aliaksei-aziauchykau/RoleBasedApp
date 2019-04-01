import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentService } from "./services/payment.service";
import { MakePaymentComponent } from "./components/make-payment.component";
import { StripePaymentAttachMethodComponent } from "./components/stripe-payment-attach/stripe-payment-attach-method.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        MakePaymentComponent,
        StripePaymentAttachMethodComponent
    ],
    exports: [
        MakePaymentComponent,
        StripePaymentAttachMethodComponent
    ],
    providers: [PaymentService]
})
export class PaymentModule { }