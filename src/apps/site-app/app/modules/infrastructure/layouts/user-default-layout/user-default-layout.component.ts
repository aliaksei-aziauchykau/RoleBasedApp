import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "mc-user-default-layout",
    templateUrl: "./user-default-layout.component.html",
    styleUrls: ["./user-default-layout.component.scss"]
})
export class UserDefaultLayoutComponent implements OnInit {
    @Input() title: string = "Default";
    @Input() isSubscriptionDisabled: boolean;

    constructor() { }

    ngOnInit(): void { }
}
