import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsPanelComponent } from "./settings-panel/settings-panel.component";
import { ProductSettingsPanelComponent } from "./product-settings-panel/product-settings-panel.component";
import { StripeSettingsPanelComponent } from "./stripe-settings-panel/stripe-settings-panel.component";
import { CustomFormsModule } from "../forms/custom-forms.module";
import { PaymentModule } from "../../business/payment/payment.module";
import { PaymentSettingsPanelComponent } from "./payment-settings-panel/payment-settings-panel.component";
import { PlanModule } from "../../business/plan/plan.module";
import { ControlsModule } from "../controls/controls.module";

@NgModule({
    imports: [
        CommonModule,
        CustomFormsModule,
        PaymentModule,
        PlanModule,
        ControlsModule
    ],
    declarations: [
        StripeSettingsPanelComponent,
        ProductSettingsPanelComponent,
        PaymentSettingsPanelComponent,
        SettingsPanelComponent
    ],
    exports: [
        SettingsPanelComponent
    ],
    providers: [],
})
export class PanelsModule {}