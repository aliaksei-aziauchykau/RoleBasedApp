import { ActivePanelEnum } from "../enums/active-panel.enum";


export interface IAppState {
    counterState: number;
    panelsState: {
        activeUserPanel: ActivePanelEnum
    };
}