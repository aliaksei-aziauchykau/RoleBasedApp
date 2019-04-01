import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommonLayoutModule } from "./common-layout/common-layout.module";
import { CommonLayoutComponent } from "./common-layout/common-layout.component";
import { UserDefaultLayoutModule } from "./user-default-layout/user-default-layout.module";

@NgModule({
    imports: [
        CommonModule,
        CommonLayoutModule,
        UserDefaultLayoutModule
    ],
    declarations: [],
    exports: [
        CommonLayoutComponent,
        UserDefaultLayoutModule
    ],
    providers: [],
})
export class LayoutModule {}