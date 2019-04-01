import { Component, OnInit, Input, AfterViewInit, OnDestroy, ElementRef } from "@angular/core";
import { ItemPopupModel } from "../../models";
import { PopupService } from "../../../../../services/popup.service";

@Component({
    selector: "mc-time-popup",
    templateUrl: "./time-popup.component.html",
    styleUrls: ["./time-popup.component.scss"]
})
export class TimePopupComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() item: ItemPopupModel;
    public isFadeout: boolean;
    constructor(private readonly popupService: PopupService,
        private readonly elementRef: ElementRef) {
    }

    public itemPopupClass: string;
    private removePopupRef: any;
    private setFadeoutClassRef: any;

    ngOnInit(): void {
        this.itemPopupClass = this.popupService.getAlertClass(this.item.type);
        let self = this;
        $(".mc-container").hover(function() {}, function() {
            clearInterval(self.removePopupRef);
            $(this).removeClass("fade-out");
        });
    }

    ngAfterViewInit(): void {
        this.setFadeoutClass();
        this.removePopup();
    }

    ngOnDestroy(): void {
        clearInterval(this.removePopupRef);
        clearInterval(this.setFadeoutClassRef);
    }

    private removePopup(): void {
        this.removePopupRef = setInterval(() => this.removeMessage(), 6000);
    }

    private setFadeoutClass(): void {
        this.setFadeoutClassRef = setInterval(() => this.isFadeout = true, 3000);
    }

    public removeMessage(): void {
        this.popupService.removeMessage(this.item);
    }

}
