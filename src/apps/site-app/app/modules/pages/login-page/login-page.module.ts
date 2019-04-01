import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomFormsModule } from "../../infrastructure/forms/custom-forms.module";
import { LoginPageComponent } from "./login-page.component";

@NgModule({
    imports: [
        CommonModule,
        CustomFormsModule
    ],
    declarations: [
        LoginPageComponent
    ],
    exports: [
        LoginPageComponent
    ],
    providers: [],
})
export class LoginPageModule {}