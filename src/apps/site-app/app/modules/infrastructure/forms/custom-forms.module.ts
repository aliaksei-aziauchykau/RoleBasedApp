import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserProductDetailsFormComponent } from "./user-product-details-form/user-product-details-form.component";
import { FormsModule } from "@angular/forms";
import { ControlsModule } from "../controls/controls.module";
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { RouterModule } from "@angular/router";
import { AddPlansFormComponent } from "./add-plans-form/add-plans-form.component";
import { CreatePostsFormComponent } from "./create-posts-form/create-posts-form.component";
import { QuillModule } from "ngx-quill";


@NgModule({
    imports: [
        ControlsModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        RouterModule,
        QuillModule,
    ],
    declarations: [
        UserProductDetailsFormComponent,
        LoginFormComponent,
        RegistrationFormComponent,
        AddPlansFormComponent,
        CreatePostsFormComponent
    ],
    exports: [
        UserProductDetailsFormComponent,
        LoginFormComponent,
        RegistrationFormComponent,
        AddPlansFormComponent,
        CreatePostsFormComponent
    ],
    providers: [],
})
export class CustomFormsModule {}