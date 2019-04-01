import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductPresentCardComponent } from "./product-present-card/product-present-card.component";
import { ProductPresentListComponent } from "./product-present-list/product-present-list.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        ProductPresentCardComponent,
        ProductPresentListComponent,
    ],
    exports: [
        ProductPresentListComponent
    ],
    providers: []
})
export class ProductModule {}