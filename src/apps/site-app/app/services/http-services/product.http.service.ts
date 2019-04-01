import { Locker } from "./../../utils/locker";
import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { Observable } from "rxjs";
import { Endpoints } from "../../../../../core/endpoints";
import { StorageSettings } from "../../models/storage-settings";
import { LockerTypeEnum } from "../../utils/locker-type.enum";
import { ProductInfo } from "../../models/product-info.model";
import { Constants } from "../../../../../core/constants";

@Injectable()
export class ProductHttpService {

    constructor(
        private readonly httpService: HttpService
    ) {}

    public getAllProducts(): Observable<ProductInfo[]> {
        const source = this.httpService.invokeGet<ProductInfo[]>(
            Endpoints.Products(),
            undefined,
            <StorageSettings>{ updateFuncOnResp: service => service.allProducts }
        );
        return Locker.wrap(source, LockerTypeEnum.AllProductGet);
    }

    public getProductInfo(userId: string, storageSettings?: StorageSettings): Observable<ProductInfo> {

        const source = this.httpService.invokeGet<ProductInfo>(
            Endpoints.Products({id: userId}),
            undefined,
            <StorageSettings>{ ...storageSettings, trackType: LockerTypeEnum.ProductInfoGet }
        );

        return source;
    }

    public updateProductInfo(userId: string, productInfo: ProductInfo, storageSettings?: StorageSettings): Observable<{}> {

        const source = this.httpService.invokePut<{}, ProductInfo>(
            Endpoints.Products({id: userId}),
            productInfo,
            undefined,
            storageSettings
        );
        return source;
    }
}