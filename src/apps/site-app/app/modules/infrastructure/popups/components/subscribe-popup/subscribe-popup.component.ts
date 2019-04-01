import { Component, OnInit, Input } from "@angular/core";
import { PlanTypeModel } from "../../../../../models/post-info.modet";
import { StripeHttpService } from "../../../../../services/http-services/stripe.http.service";
import { CreateCustomerRequest } from "../../../../../models/requests/create-customer.request";
import { DataStorageService } from "../../../../../services/data-storage.service";
import { SafeComponent } from "../../../../../utils/safe-component.abstract";
import { StripeInfoModel, StripePaymentMethod } from "../../../../../models/stripe.view.models";
import { check } from "../../../../../utils/custom-operators";
import { GenericListItem } from "../../../controls/models/generic-list-item.model";
import { CreateSubscriptionRequest } from "../../../../../models/requests/create-subscription.request";

@Component({
    selector: "mc-subscribe-popup",
    templateUrl: "./subscribe-popup.component.html",
    styleUrls: ["./subscribe-popup.component.scss"]
})
export class SubscribePopupComponent extends SafeComponent implements OnInit {

    @Input() productName: string;
    @Input() plans: PlanTypeModel[] = [];


    public stripeInfo: StripeInfoModel;
    public paymentMethods: GenericListItem[];

    public selectedPlan: PlanTypeModel;
    public selectedPayment: StripePaymentMethod;
    constructor(
        private readonly stripeHttpService: StripeHttpService,
        private readonly dataStorageService: DataStorageService
    ) {
        super();
    }

    ngOnInit(): void {
        // this.dataStorageService.stripeInfoCurrent.pipe(
        //     check(this.unsubscriber, this.stripeInfo, x => {
        //         this.stripeInfo = x;
        //         this.paymentMethods = this.stripeInfo.paymentMethods.map(x => new GenericListItem(x)) || [];
        //     })
        // ).subscribe();
    }

    selectPlan(plan: PlanTypeModel) {
        this.selectedPlan = plan;
    }

    selectPaymentChange(item: GenericListItem) {
        this.selectedPayment = item.source;
    }

    saveCustomer({ email: customerEmail, token: paymentToken }: any) {
        this.stripeHttpService.createCustormerStripe(<CreateCustomerRequest>{
            customerEmail,
            paymentToken,
            productName: this.productName
        });
    }

    createSubscription(): void {
        const createCustomer$ = this.stripeHttpService.createCustormerStripe(<CreateCustomerRequest>{
            customerEmail: this.selectedPayment.email,
            paymentToken: this.selectedPayment.token,
            productName: this.productName
        });

        const createSubscription$ = this.stripeHttpService.createStripeSubscription(<CreateSubscriptionRequest>{
            planName: this.selectedPlan.id,
            productName: this.productName,
            customerEmail: this.selectedPayment.email
        });

        createCustomer$.flatMap(() => createSubscription$).subscribe();
    }
}
