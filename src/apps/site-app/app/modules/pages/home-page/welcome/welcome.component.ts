import { Component, OnInit } from "@angular/core";
import { select } from "@angular-redux/store";
import { NgRedux } from "@angular-redux/store";
import { Observable } from "rxjs";
import { IAppState } from "../../../../redux/app.state";
import { HttpService } from "../../../../services/http.service";
import { increment, decrement } from "../../../../redux/counter.reducer";

@Component({
    selector: "mc-welcome",
    templateUrl: "./welcome.component.html",
    styleUrls: [("./welcome.component.scss")]
})
export class WelcomeComponent implements OnInit {
    ngOnInit(): void {
    }

    @select((state: IAppState) => state.counterState) count: Observable<number>;

    constructor(
        private readonly httpService: HttpService,
        private readonly ngRedux: NgRedux<IAppState>
    ) {
    }

    clickAdd() {
        this.ngRedux.dispatch(increment());
    }

    clickRemove() {
        this.ngRedux.dispatch(decrement());
    }
}