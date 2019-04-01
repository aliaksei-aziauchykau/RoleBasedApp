import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PlanListComponent } from "./plan-list/plan-list.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        PlanListComponent
    ],
    exports: [
        PlanListComponent
    ],
    providers: []
})
export class PlanModule {}