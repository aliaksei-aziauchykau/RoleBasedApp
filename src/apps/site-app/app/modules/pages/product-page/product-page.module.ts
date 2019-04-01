import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductPageComponent } from "./product-page.component";
import { LayoutModule } from "../../infrastructure/layouts/layout.module";
import { ControlsModule } from "../../infrastructure/controls/controls.module";
import { WidgetsModule } from "../../infrastructure/widgets/widgets.module";
import { PopupsModule } from "../../infrastructure/popups/popups.module";

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        WidgetsModule,
        PopupsModule
    ],
    declarations: [
        ProductPageComponent
    ],
    exports: [
        ProductPageComponent
    ],
    providers: [],
})
export class ProductPageModule {}