import { Component, OnInit } from "@angular/core";
import { ProductInfo } from "../../../../models/product-info.model";
import { SafeComponent } from "../../../../utils/safe-component.abstract";
import { DataStorageService } from "../../../../services/data-storage.service";
import { check } from "../../../../utils/custom-operators";
import { ProductHttpService } from "./../../../../services/http-services/product.http.service";
import { StripeHttpService } from "../../../../services/http-services/stripe.http.service";
import { StripeInfoModel } from "../../../../models/stripe.view.models";
import { CurrentUserHttpService } from "../../../../services/http-services/current.user.http.service";


@Component({
    selector: "mc-product-settings-panel",
    templateUrl: "./product-settings-panel.component.html",
    styleUrls: ["./product-settings-panel.component.scss"]
})
export class ProductSettingsPanelComponent extends SafeComponent implements OnInit {

    public isDeployed: boolean;
    public isBindedProduct: boolean;
    public productInfo: ProductInfo;
    public stripeInfo: StripeInfoModel;

    constructor(
        private readonly dataStorageService: DataStorageService,
        private readonly productHttpService: ProductHttpService,
        private readonly stripeHttpService: StripeHttpService,
        private readonly currentHttpService: CurrentUserHttpService
    ) {
        super();
    }


    ngOnInit(): void {
        this.dataStorageService.productInfoCurrent.pipe(
            check(this.unsubscriber, this.productInfo, x => {
                this.productInfo = x;
                this.isDeployed = x.isDeployed;
            })
        ).subscribe();

        // this.dataStorageService.stripeInfoCurrent.pipe(
        //     check(this.unsubscriber, this.stripeInfo, x => {
        //         this.stripeInfo = x;
        //         this.isBindedProduct = Boolean(this.stripeInfo.product && this.stripeInfo.product.productToken);
        //     })
        // ).subscribe();
    }

    public linkProduct() {
        const isDeployed: boolean = !this.isDeployed;
        this.currentHttpService.updateProductInfo(<ProductInfo>{...this.productInfo, isDeployed })
            .subscribe();
    }

    public bindProduct(): void {
        this.stripeHttpService.createStripeProduct(this.productInfo.productName)
            .flatMap(() => this.currentHttpService.getStripeInfo())
            .subscribe();
    }
}
