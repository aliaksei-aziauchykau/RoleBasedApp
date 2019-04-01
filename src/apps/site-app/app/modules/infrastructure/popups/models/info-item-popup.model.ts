import { ItemPopupModel } from "./item-popup.model";
import { ItemPopupType } from "../enums/item-popup-type.enum";

export class InfoItemPopup extends ItemPopupModel  {
    type: ItemPopupType = ItemPopupType.Info;
}