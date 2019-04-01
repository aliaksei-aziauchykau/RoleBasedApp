import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PicturePresentorComponent } from "./picture-presentor/picture-presentor.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { RouterModule } from "@angular/router";
import { CustomFormsModule } from "../forms/custom-forms.module";
import { PostEditorComponent } from "./post-editor/post-editor.component";
import { PostListComponent } from "./post-list/post-list.component";
import { QuillModule } from "ngx-quill";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CustomFormsModule,
        QuillModule
    ],
    declarations: [
        PicturePresentorComponent,
        SpinnerComponent,
        PostEditorComponent,
        PostListComponent
    ],
    exports: [
        PicturePresentorComponent,
        SpinnerComponent,
        PostEditorComponent,
        PostListComponent
    ],
    providers: [],
})
export class WidgetsModule {}