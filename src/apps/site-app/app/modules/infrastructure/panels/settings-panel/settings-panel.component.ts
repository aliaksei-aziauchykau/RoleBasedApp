import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { SafeComponent } from "../../../../utils/safe-component.abstract";
import { IAppState } from "../../../../redux/app.state";
import { select, NgRedux } from "@angular-redux/store";
import { UserInfoModel } from "../../../../models/user.view.models";
import { map } from "rxjs/operators";
import { check } from "../../../../utils/custom-operators";
import { changeUserPanel } from "../../../../redux/panels.reducer";
import { ActivePanelEnum } from "../../../../enums/active-panel.enum";


@Component({
    selector: "mc-settings-panel",
    templateUrl: "./settings-panel.component.html",
    styleUrls: ["./settings-panel.component.scss"]
})
export class SettingsPanelComponent extends SafeComponent implements OnInit {

    // private activePanel: ActivePanelEnum = ActivePanelEnum.Stripe;
    public activePanel: ActivePanelEnum;
    public ActivePanelEnum = ActivePanelEnum;

    @select((state: IAppState) => state.panelsState) panelsState: Observable<{activeUserPanel: ActivePanelEnum}>;

    @Input() userInfo: UserInfoModel;

    constructor(private readonly ngRedux: NgRedux<IAppState>) {
        super();
    }

    ngOnInit(): void {
        this.panelsState.pipe(
            map(state => state.activeUserPanel),
            check(this.unsubscriber, this.activePanel, (value) => this.activePanel = value)
        ).subscribe();
    }

    public changePanel(newTab: ActivePanelEnum): void {
        this.ngRedux.dispatch(changeUserPanel(newTab));
    }

    public isActive(tab: ActivePanelEnum): boolean {
        return this.activePanel === tab;
    }

}
