import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditedInputComponent } from "./edited-input/edited-input.component";
import { EditedInputInnerComponent } from "./edited-input/edited-input-inner/edited-input-inner.component";
import { CustomDisrectivesModule } from "../../../directives/custom-directives.module";
import { FormsModule } from "@angular/forms";
import { LoginButtonComponent } from "./login-button/login-button.component";
import { SubscribeButtonComponent } from "./subscribe-button/subscribe-button.component";
import { GenericListComponent } from "./generic-list/generic-list.component";
import { TagEditorComponent } from "./tag-editor/tag-editor.component";
import { MaterialModule } from "../material/material.module";

@NgModule({
    imports: [
        CustomDisrectivesModule,
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [
        EditedInputComponent,
        EditedInputInnerComponent,
        LoginButtonComponent,
        SubscribeButtonComponent,
        GenericListComponent,
        TagEditorComponent
    ],
    exports: [
        EditedInputComponent,
        LoginButtonComponent,
        SubscribeButtonComponent,
        GenericListComponent,
        TagEditorComponent
    ],
    providers: [],
})
export class ControlsModule {}