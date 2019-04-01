import { Component, OnInit } from "@angular/core";
import { ProductHttpService } from "../../../services/http-services/product.http.service";
import { Locker } from "../../../utils/locker";
import { LockerTypeEnum } from "../../../utils/locker-type.enum";
import { ProductViewModel } from "../../business/product/models/product-view.model";

@Component({
  selector: "mc-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {
    constructor(private readonly productHttpService: ProductHttpService) {

    }

    private products: ProductViewModel[];

    public get isDataLoaded(): boolean {
        const result = Locker.instance.isLocked(LockerTypeEnum.AllProductGet);
        return result;
    }

    ngOnInit(): void {
        const source = this.productHttpService.getAllProducts();
        source.subscribe(x => {
            this.products = x.map(a => {
                const model = <ProductViewModel>{ name: a.productName, description: a.description, path: a.productPath };
                const newModel = new ProductViewModel(model);
                return newModel;
            });
        });
    }
}