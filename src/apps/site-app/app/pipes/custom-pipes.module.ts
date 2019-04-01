import { NgModule } from "@angular/core";
import { CappitalizeLetterPipe } from "./capitalize-letter.pipe";

@NgModule({
    imports: [],
    declarations: [
        CappitalizeLetterPipe
    ],
    exports: [
        CappitalizeLetterPipe
    ],
    providers: [],
})
export class CustomPipesModule {}