import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../../css/common.css";
import "@angular/material/prebuilt-themes/indigo-pink.css";

if (process.env.NODE_ENV !== "development") {
    enableProdMode();
}

$(document).ready(() => {
    platformBrowserDynamic().bootstrapModule(AppModule);
});