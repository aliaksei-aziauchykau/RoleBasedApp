import { CookieModel } from "./cookie.model";

export class CookieContatinerModel {
    public rawCookie: string;
    public modelCookie: CookieModel;

    constructor() {
        this.rawCookie = "";
        this.modelCookie = new CookieModel();
    }
}