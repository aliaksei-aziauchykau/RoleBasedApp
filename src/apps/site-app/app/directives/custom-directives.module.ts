import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FocusOutDirective } from "./focus-out.directive";

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        FocusOutDirective
    ],
    exports: [
        FocusOutDirective
    ],
    providers: [],
})
export class CustomDisrectivesModule {}