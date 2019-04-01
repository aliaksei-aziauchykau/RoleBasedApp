import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "mc-subscribe-button",
    templateUrl: "./subscribe-button.component.html",
    styleUrls: ["./subscribe-button.component.scss"]
})
export class SubscribeButtonComponent implements OnInit {
    @Input() isDisabled: boolean = false;
    constructor() { }

    ngOnInit(): void { }
}
