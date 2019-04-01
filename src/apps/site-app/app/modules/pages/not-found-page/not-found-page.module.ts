import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "../../infrastructure/layouts/layout.module";
import { NotFoundPageComponent } from "./not-found-page.component";

@NgModule({
    imports: [
        CommonModule,
        LayoutModule
    ],
    declarations: [NotFoundPageComponent],
    exports: [NotFoundPageComponent],
    providers: [],
})
export class NotFoundPageModule { }