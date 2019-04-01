import { ItemPopupModel } from "./item-popup.model";
import { ItemPopupType } from "../enums/item-popup-type.enum";

export class SuccessItemPopup extends ItemPopupModel  {
    type: ItemPopupType = ItemPopupType.Success;
}