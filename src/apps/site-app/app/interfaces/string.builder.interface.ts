import { SettingsModel } from "../models/setting.model";

export interface IStringBuilder {
    parse(env: any): IStringBuilder;
    getSettings: SettingsModel;
}