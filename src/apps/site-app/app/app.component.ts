import { Component } from "@angular/core";
import { SettingsBuilder } from "./builders/settings.builder";
import { SettingsService } from "./services/settings.service";

@Component({
  selector: "mc-app",
  templateUrl: "./app.component.html",
  styleUrls: [("./app.component.scss")]
})
export class AppComponent {
    constructor(private readonly settignsService: SettingsService) {
        this.settignsService.settings = new SettingsBuilder()
            .parse(clientSettings)
            .getSettings;
    }
 }