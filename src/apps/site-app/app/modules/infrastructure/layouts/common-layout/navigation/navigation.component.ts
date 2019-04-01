import { Component, OnInit } from "@angular/core";
import { SafeComponent } from "../../../../../utils/safe-component.abstract";
import { SettingsService } from "../../../../../services/settings.service";

@Component({
  selector: "mc-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: [("./navigation.component.scss")]
})
export class NavigationComponent extends SafeComponent implements OnInit {

    constructor(private readonly settingsService: SettingsService) {
        super();
    }
    public logged: boolean;

    ngOnInit(): void {
        this.settingsService.$cookie
            .takeUntil(this.unsubscriber)
            .map(x => x.modelCookie.logged === "true")
            .filter(x => this.logged !== x)
            .do(x => this.logged = x)
            .subscribe();
    }
 }