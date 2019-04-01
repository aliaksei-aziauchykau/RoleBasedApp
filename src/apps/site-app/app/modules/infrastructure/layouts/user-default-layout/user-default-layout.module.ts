import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultFooterComponent } from "./default-footer/default-footer.component";
import { UserDefaultLayoutComponent } from "./user-default-layout.component";
import { DefaultNavigationComponent } from "./default-navigation/default-navigation.component";
import { RouterModule } from "@angular/router";
import { ControlsModule } from "../../controls/controls.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ControlsModule
    ],
    declarations: [
        DefaultNavigationComponent,
        DefaultFooterComponent,
        UserDefaultLayoutComponent
    ],
    exports: [
        UserDefaultLayoutComponent
    ],
    providers: [],
})
export class UserDefaultLayoutModule {}