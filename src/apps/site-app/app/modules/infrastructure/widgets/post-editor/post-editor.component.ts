import { Component, OnInit, Input } from "@angular/core";
import { PlanTypeModel } from "../../../../models/post-info.modet";

@Component({
    selector: "mc-post-editor",
    templateUrl: "./post-editor.component.html",
    styleUrls: ["./post-editor.component.scss"]
})
export class PostEditorComponent implements OnInit {
    @Input() plans: PlanTypeModel[];
    constructor() { }

    ngOnInit(): void { }
}
