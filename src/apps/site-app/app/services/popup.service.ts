import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { ItemPopupModel, SuccessItemPopup, ErrorItemPopup } from "../modules/infrastructure/popups/models";
import { ItemPopupType } from "../modules/infrastructure/popups/enums/item-popup-type.enum";


@Injectable()
export class PopupService {
    public messages: BehaviorSubject<ItemPopupModel[]> = new BehaviorSubject([]);

    public addMessage(item: ItemPopupModel): void {
        const currentValue = this.messages.value;
        currentValue.push(item);
        this.messages.next(currentValue);
    }

    public removeMessage(item: ItemPopupModel): void {
        this.messages.next(this.messages.value.filter(x => x !== item));
    }

    public getAlertClass(type: ItemPopupType): string {
        let result: string;
        switch (type) {
            case ItemPopupType.Success: result = "alert-success"; break;
            case ItemPopupType.Info: result = "alert-info"; break;
            case ItemPopupType.Error: result = "alert-danger"; break;
        }

        return result;
    }

    public successOnHttpCall(url: string = "") {
        const message: string = url ? `Was saved on: [${url}]` : "Was saved";
        this.addMessage(new SuccessItemPopup(message));
    }

    public errorOnHttpCall(error: string, url: string = "") {
        let message: string = url ? `Was failed on: [${url}]` : "Was failed";
        message = error ? `${message} Reason is: [${error}]` : message;
        this.addMessage(new ErrorItemPopup(message));
    }
}