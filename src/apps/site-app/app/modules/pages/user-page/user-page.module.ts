import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WidgetsModule } from "../../infrastructure/widgets/widgets.module";
import { ProductModule } from "../../business/product/product.module";
import { LayoutModule } from "../../infrastructure/layouts/layout.module";
import { UserPageComponent } from "./user-page.component";
import { PanelsModule } from "../../infrastructure/panels/panels.module";
import { PlanModule } from "../../business/plan/plan.module";

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        ProductModule,
        WidgetsModule,
        PanelsModule
    ],
    declarations: [
        UserPageComponent,
    ],
    exports: [
        UserPageComponent
    ],
    providers: [],
})
export class UserPageModule {}