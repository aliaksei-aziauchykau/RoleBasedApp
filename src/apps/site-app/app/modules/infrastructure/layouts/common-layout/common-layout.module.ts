import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { CommonLayoutComponent } from "./common-layout.component";
import { RouterModule } from "@angular/router";
import { PopupsModule } from "../../../infrastructure/popups/popups.module";
import { ControlsModule } from "../../controls/controls.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PopupsModule,
    ControlsModule
  ],
  declarations: [
    FooterComponent,
    NavigationComponent,
    CommonLayoutComponent
  ],
  exports: [
    CommonLayoutComponent
  ]
})
export class CommonLayoutModule { }