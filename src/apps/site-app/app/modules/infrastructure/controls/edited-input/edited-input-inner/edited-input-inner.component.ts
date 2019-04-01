import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { EditedInputModel } from "../../models/edited-input.model";

@Component({
    selector: "mc-edited-input-inner",
    templateUrl: "./edited-input-inner.component.html",
    styleUrls: ["./edited-input-inner.component.scss"]
})
export class EditedInputInnerComponent implements OnInit {
    @Input() model: EditedInputModel;

    @ViewChild("focusTarget") focusTarget: ElementRef;

    constructor() { }

    ngOnInit(): void { }

    click() {
        this.model.state = true;
        setTimeout(() => this.focusTarget && this.focusTarget.nativeElement.focus(), 0);
    }
}
