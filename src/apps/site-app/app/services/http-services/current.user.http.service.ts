import { Injectable } from "@angular/core";
import { UserInfoModel } from "../../models/user.view.models";
import { Observable } from "../../../../../../node_modules/rxjs";
import { StorageSettings } from "../../models/storage-settings";
import { DataStorageService } from "../data-storage.service";
import { UserHttpService } from "./user.http.service";
import { ProductInfo } from "../../models/product-info.model";
import { StripeInfoModel } from "../../models/stripe.view.models";
import { ProductHttpService } from "./product.http.service";
import { StripeHttpService } from "./stripe.http.service";
import { trackExecution } from "../../utils/custom-operators";
import { LockerTypeEnum } from "../../utils/locker-type.enum";
import { SessionHttpService } from "./session.http.service";
import { SessionInfo } from "../../models/session-info.model";

@Injectable()
export class CurrentUserHttpService {

    constructor(
        private readonly userHttpService: UserHttpService,
        private readonly productHttpService: ProductHttpService,
        private readonly stripeHttpService: StripeHttpService,
        private readonly sessionHttpService: SessionHttpService,
        private readonly dataStorageService: DataStorageService
    ) {}

    private get userId() {
        const result = this.dataStorageService.sessionInfoCurrent.getValue().userId;
        return result;
    }

    public getUserInfo(): Observable<UserInfoModel> {
        const currentUserId = this.userId;
        const source = this.userHttpService.get(
            currentUserId,
            <StorageSettings> { updateFuncOnResp: (service => service.userInfoCurrent) }
        );
        return source;
    }

    public getProductInfo(): Observable<ProductInfo> {
        const currentUserId = this.userId;
        const source = this.productHttpService.getProductInfo(
            currentUserId,
            <StorageSettings> { updateFuncOnResp: (service => service.productInfoCurrent) }
        );
        return source;
    }

    public getStripeInfo(): Observable<StripeInfoModel> {
        const currentUserId = this.userId;
        const source = this.stripeHttpService.getStripeInfo(
            currentUserId,
            <StorageSettings> { updateFuncOnResp: (service => service.stripeInfoCurrent) }
        );

        return source;
    }

    public getSessionInfo(): Observable<SessionInfo> {
        const source = this.sessionHttpService.getSessionInfo(
            undefined,
            <StorageSettings> { updateFuncOnResp: (service => service.sessionInfoCurrent) }
        );

        return source;
    }

    public updateProductInfo(productInfo: ProductInfo): Observable<{}> {
        const currentUserId = this.userId;
        const source = this.productHttpService.updateProductInfo(
            currentUserId,
            productInfo,
            undefined
        );
        return source;
    }
}