import { Observable, of } from "rxjs";

export class EditedInputModel {
    public label: string;
    public placeholder: string;
    public value: string;
    public lastSaved: string;
    public state: boolean;
    public httpCall: (value: EditedInputModel) => Observable<{}> = (value) => of({});
}