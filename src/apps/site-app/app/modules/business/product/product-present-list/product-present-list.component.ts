import { Component, OnInit, Input } from "@angular/core";
import { ProductViewModel } from "../models/product-view.model";

@Component({
    selector: "mc-product-present-list",
    templateUrl: "./product-present-list.component.html",
    styleUrls: ["./product-present-list.component.scss"]
})
export class ProductPresentListComponent implements OnInit {
    @Input() products: ProductViewModel[] = [];
    constructor() { }

    ngOnInit(): void { }
}
