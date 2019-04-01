import { ItemPopupModel } from "./item-popup.model";
import { ItemPopupType } from "../enums/item-popup-type.enum";

export class ErrorItemPopup extends ItemPopupModel  {
    type: ItemPopupType = ItemPopupType.Error;
}