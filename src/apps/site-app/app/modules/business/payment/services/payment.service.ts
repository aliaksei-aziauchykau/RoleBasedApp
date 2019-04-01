import { Injectable } from "@angular/core";
import { ApiInvokerService } from "../../../../../../../core/api";
import { Endpoints } from "../../../../../../../core/endpoints";
@Injectable()
export class PaymentService {
    public charge(product: any, token: any): void {
        console.log(token);
        const customerInfo = {
            email: token.email,
            source: token.id
        };
        const chargeInfo = {
            amount: product.amount,
            description: product.description,
            currency: product.currency
        };
        ApiInvokerService.invokePost(Endpoints.StripeCharge(), {
            customerInfo,
            chargeInfo
        })
        .then((data: any) => console.log(data))
        .catch((error: any) => console.error(error));
    }
}