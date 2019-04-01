import { Injectable } from "@angular/core";
import { IStringBuilder } from "../interfaces/string.builder.interface";
import { SettingsModel } from "../models/setting.model";

export class SettingsBuilder implements IStringBuilder {
    private settings: SettingsModel;

    constructor() {
    }

    public parse(env: any): SettingsBuilder {
        this.settings = new SettingsModel(env);
        return this;
    }

    get getSettings(): SettingsModel {
        return this.settings;
    }
}