import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimePopupComponent } from "./components/time-popup/time-popup.component";
import { TimesPopupComponent } from "./components/times-popup/times-popup.component";
import { SubscribePopupComponent } from "./components/subscribe-popup/subscribe-popup.component";
import { PaymentModule } from "../../business/payment/payment.module";
import { ControlsModule } from "../controls/controls.module";

@NgModule({
    imports: [
        CommonModule,
        PaymentModule,
        ControlsModule
    ],
    declarations: [
        TimePopupComponent,
        TimesPopupComponent,
        SubscribePopupComponent
    ],
    exports: [
        TimesPopupComponent,
        SubscribePopupComponent
    ],
    providers: []
})
export class PopupsModule { }