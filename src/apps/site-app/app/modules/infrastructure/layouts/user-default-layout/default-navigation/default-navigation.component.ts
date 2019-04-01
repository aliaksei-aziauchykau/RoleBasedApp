import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "mc-default-navigation",
    templateUrl: "./default-navigation.component.html",
    styleUrls: ["./default-navigation.component.scss"]
})
export class DefaultNavigationComponent implements OnInit {

    @Input() title: string;
    @Input() isSubscriptionDisabled: boolean;

    constructor() { }

    ngOnInit(): void { }
}
