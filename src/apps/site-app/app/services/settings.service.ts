import { Injectable } from "@angular/core";
import { SettingsModel } from "../models/setting.model";
import { BehaviorSubject } from "rxjs";
import { CookieModel } from "../models/cookie/cookie.model";
import { CookieContatinerModel } from "../models/cookie/cookie.container.model";

@Injectable()
export class SettingsService {

    public $cookie: BehaviorSubject<CookieContatinerModel> = new BehaviorSubject<CookieContatinerModel>(new CookieContatinerModel);

    private _settings: SettingsModel;
    public get settings(): SettingsModel {
        return this._settings;
    }
    public set settings(value: SettingsModel) {
        this._settings = value;
    }

    public analizeCookie(rawCookie: string): void {
        const currentContainer: CookieContatinerModel = this.$cookie.getValue();
        if (currentContainer.rawCookie !== rawCookie) {
            const newContainer: CookieContatinerModel = this.parseCookie(rawCookie);
            this.$cookie.next(newContainer);
        }
    }

    constructor() {
        this.analizeCookie(document.cookie);
    }

    private parseCookie(rawCookie: string): CookieContatinerModel {
        const cookieContainer: CookieContatinerModel = new CookieContatinerModel();
        const cookieModel: CookieModel = new CookieModel();
        const cookieSplitted = rawCookie.split("; ");
        for (let i = 0; i < cookieSplitted.length; i++) {
            let current = cookieSplitted[i].split("=");
            cookieModel[current[0]] = current[1];
        }

        cookieContainer.rawCookie = rawCookie;
        cookieContainer.modelCookie = cookieModel;
        return cookieContainer;
    }
}