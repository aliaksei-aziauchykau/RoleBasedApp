import { Component, OnInit, Input } from "@angular/core";
import { SettingsService } from "../../../../services/settings.service";

@Component({
    selector: "mc-spinner",
    templateUrl: "./spinner.component.html",
    styleUrls: ["./spinner.component.scss"]
})
export class SpinnerComponent implements OnInit {
    @Input() show: boolean;

    constructor(private readonly settingService: SettingsService) { }

    ngOnInit(): void { }

    private get isTest(): boolean {
        return this.settingService.settings.isTest;
    }
}
