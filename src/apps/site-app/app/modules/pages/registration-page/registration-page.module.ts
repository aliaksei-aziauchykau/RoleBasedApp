import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomFormsModule } from "../../infrastructure/forms/custom-forms.module";
import { RegistrationPageComponent } from "./registration-page.component";

@NgModule({
    imports: [
        CommonModule,
        CustomFormsModule
    ],
    declarations: [
        RegistrationPageComponent
    ],
    exports: [
        RegistrationPageComponent
    ],
    providers: [],
})
export class RegistrationPageModule {}