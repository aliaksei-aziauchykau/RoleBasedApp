import { tap } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../../../../services/data-storage.service";
import { UserHttpService } from "../../../../services/http-services/user.http.service";
import { SafeComponent } from "../../../../utils/safe-component.abstract";
import { ProductInfo } from "../../../../models/product-info.model";
import { EditedInputModel } from "../../controls/models/edited-input.model";
import { check } from "../../../../utils/custom-operators";
import { IDictionary } from "../../../../interfaces/dictionary.interface";
import { ProductHttpService } from "./../../../../services/http-services/product.http.service";
import { CurrentUserHttpService } from "../../../../services/http-services/current.user.http.service";

@Component({
    selector: "mc-user-product-details-form",
    templateUrl: "./user-product-details-form.component.html",
    styleUrls: ["./user-product-details-form.component.scss"]
})
export class UserProductDetailsFormComponent extends SafeComponent implements OnInit {
    constructor(
        private readonly dataStorageService: DataStorageService,
        private readonly currentUserHttpService: CurrentUserHttpService
    ) {
        super();
    }

    public productInfo: ProductInfo;
    public items: IDictionary<EditedInputModel> = {};

    ngOnInit(): void {
        this.dataStorageService.productInfoCurrent
            .pipe(
                check(this.unsubscriber, this.productInfo, x => this.productInfo = x),
                tap(x => this.initialize(x))
            )
            .subscribe();
    }

    initialize(productInfo: ProductInfo) {
        console.log("AARE", productInfo);
        this.items = {
            "productName": <EditedInputModel>{
                label: "Product Name",
                placeholder: "Shop",
                value: productInfo.productName,
                lastSaved: productInfo.productName,
                httpCall: this.httpCall("productName")
            },
            "category": <EditedInputModel>{
                label: "Category",
                placeholder: "Fall",
                value: productInfo.category,
                lastSaved: productInfo.category,
                httpCall: this.httpCall("category")
            },
            "description": <EditedInputModel>{
                label: "Description",
                placeholder: "Some",
                value: productInfo.description,
                lastSaved: productInfo.description,
                httpCall: this.httpCall("description")
            }
        };
    }

    private httpCall(property: string) {
        const returnFn = (inputModel: EditedInputModel) => {
            const modelToServer = { ...this.productInfo, [property]: inputModel.value };
            const source = this.currentUserHttpService.updateProductInfo(modelToServer)
            .pipe(
                tap(x => inputModel.lastSaved = inputModel.value)
            );
            return source;
        };

        return returnFn;
    }
}
