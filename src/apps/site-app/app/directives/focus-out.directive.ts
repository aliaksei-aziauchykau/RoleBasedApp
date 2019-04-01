import { Directive, HostListener, Input } from "@angular/core";

@Directive({
    selector: "[focusout]",
})
export class FocusOutDirective {

    @Input() focusoutAction: Function;

    @HostListener("focusout")
    focusoutHandler() {
        this.focusoutAction();
    }

 }