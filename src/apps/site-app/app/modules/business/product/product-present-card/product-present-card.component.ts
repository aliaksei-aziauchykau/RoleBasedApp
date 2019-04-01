import { Component, OnInit, Input } from "@angular/core";
import { ProductViewModel } from "../models/product-view.model";

@Component({
    selector: "mc-product-present-card",
    templateUrl: "./product-present-card.component.html",
    styleUrls: ["./product-present-card.component.scss"]
})
export class ProductPresentCardComponent implements OnInit {
    @Input() model: ProductViewModel;

    constructor() { }

    ngOnInit(): void { }
}