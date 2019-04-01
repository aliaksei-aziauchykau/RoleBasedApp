import { createReducer } from "redux-act";
import { createAction } from "redux-act";
import { ActivePanelEnum } from "../enums/active-panel.enum";

const defaultState: {} = {
    activeUserPanel: ActivePanelEnum.Stripe
};

export const changeUserPanel = createAction<ActivePanelEnum>("Change User Panel");

export default createReducer({
    [changeUserPanel.getType()]: (state, activeUserPanel) => ({ ...state, activeUserPanel }),
}, defaultState);
