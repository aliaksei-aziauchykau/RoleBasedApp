import { ItemPopupType } from "../enums/item-popup-type.enum";

export abstract class ItemPopupModel {
    public message: string;
    public abstract type: ItemPopupType;

    constructor(message: string) {
        this.message = message;
    }
}