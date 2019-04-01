import { Component, OnInit, Input } from "@angular/core";
import { EditedInputModel } from "../models/edited-input.model";
import { PopupService } from "../../../../services/popup.service";

@Component({
    selector: "mc-edited-input",
    templateUrl: "./edited-input.component.html",
    styleUrls: ["./edited-input.component.scss"]
})
export class EditedInputComponent implements OnInit {
    @Input() model: EditedInputModel;

    constructor(private readonly popupService: PopupService) { }

    public ref: Function;

    ngOnInit(): void {
        this.ref = this.focusoutAction.bind(this);
    }

    focusoutAction() {
        this.closeInput();
        this.model.lastSaved !== this.model.value && this.model.httpCall(this.model)
            .subscribe(this.onNext.bind(this), this.onError.bind(this));
    }

    onNext() {
        this.popupService.successOnHttpCall();
    }

    onError(error: string) {
        this.popupService.errorOnHttpCall(error);
    }

    closeInput() {
        this.model.state = false;
    }
}
