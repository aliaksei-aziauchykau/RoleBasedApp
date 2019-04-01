import { ICrudEntity, ICrudListEntity } from "../interfaces/crud-entity.interface";

export class StripeInfoModel implements ICrudEntity {
    public id: string = null;
    public userId: string = null;
    public stipeUserId: string = null;
    public stripeAccessToken: string = null;
}

export class StripeInfoListModel implements ICrudListEntity<ICrudEntity> {
    public items: StripeInfoModel[];
    public count: number;
}

export class StripePaymentMethod {
    public name: string;
    public email: string;
    public token: string;
}

export class StripeProductInfo {
    public name: string;
    public productToken: string;
}

export class StripePlanInfo {

    constructor() {
        this.planName = "New Plan";
        this.amount = "5000";
    }

    public id: string;
    public planName: string;
    public amount: string;
    public currency: string;
}