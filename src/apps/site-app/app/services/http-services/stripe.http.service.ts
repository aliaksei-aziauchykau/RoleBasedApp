import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { Observable } from "rxjs";
import { Endpoints } from "../../../../../core/endpoints";
import { StripeInfoModel, StripePlanInfo, StripeInfoListModel } from "../../models/stripe.view.models";
import { StorageSettings } from "./../../models/storage-settings";
import { Constants } from "../../../../../core/constants";
import { CreateCustomerRequest } from "../../models/requests/create-customer.request";
import { CreatePaymentMethodRequest } from "../../models/requests/create-payment-method.request";
import { CreateSubscriptionRequest } from "../../models/requests/create-subscription.request";
import { trackExecution } from "../../utils/custom-operators";
import { LockerTypeEnum } from "../../utils/locker-type.enum";
import { CrudHttpService } from "./crud.http.service";

@Injectable()
export class StripeHttpService extends CrudHttpService<StripeInfoModel, StripeInfoListModel> {

    constructor(
        protected readonly httpService: HttpService
    ) {
        super(httpService, Endpoints.Stripe);
    }

    public getStripeInfo(userId: string, storageSettings?: StorageSettings): Observable<StripeInfoModel> {
        const source = this.httpService.invokeGet<StripeInfoModel>(
            Endpoints.Stripe({id: userId}),
            undefined,
            <StorageSettings>{ ...storageSettings, trackType: LockerTypeEnum.StripeInfoGet }
        );

        return source;
    }

    public updateStripeInfo(userId: string, stripeInfo: StripeInfoModel, storageSettings?: StorageSettings): Observable<{}> {

        const source = this.httpService.invokePut<{}, StripeInfoModel>(
            Endpoints.Stripe({id: userId}),
            stripeInfo,
            undefined,
            storageSettings
        );
        return source;
    }

    public createStripeProduct(productName: string): Observable<{}> {

        const source = this.httpService.invokePost<{productName: string}, {}>(
            Endpoints.Stripe({id: "product"}),
            { productName },
        );
        return source;
    }

    public createStripePlan(planInfo: StripePlanInfo): Observable<{}> {

        const source = this.httpService.invokePost<StripePlanInfo, {}>(
            Endpoints.Stripe({id: "plan"}),
            planInfo
        );
        return source;
    }

    public createCustormerStripe(request: CreateCustomerRequest): Observable<{}> {

        const source = this.httpService.invokePost<CreateCustomerRequest, {}>(
            Endpoints.Stripe({id: "customer"}),
            request
        );
        return source;

    }

    public createPaymentMethodStripe(request: CreatePaymentMethodRequest): Observable<{}> {

        const source = this.httpService.invokePost<CreatePaymentMethodRequest, {}>(
            Endpoints.Stripe({id: "payment"}),
            request
        );
        return source;
    }

    public createStripeSubscription(request: CreateSubscriptionRequest): Observable<{}> {

        const source = this.httpService.invokePost<CreateSubscriptionRequest, {}>(
            Endpoints.Stripe({id: "subscription"}),
            request
        );
        return source;
    }
}