import { Component, OnInit } from "@angular/core";
import { StripePlanInfo } from "../../../../models/stripe.view.models";
import { StripeHttpService } from "../../../../services/http-services/stripe.http.service";
import { CurrentUserHttpService } from "../../../../services/http-services/current.user.http.service";

@Component({
    selector: "mc-add-plans-form",
    templateUrl: "./add-plans-form.component.html",
    styleUrls: ["./add-plans-form.component.scss"]
})
export class AddPlansFormComponent implements OnInit {

    public model: StripePlanInfo = new StripePlanInfo();

    constructor(
        private readonly stripeHttpService: StripeHttpService,
        private readonly currentUserHttpService: CurrentUserHttpService
    ) { }

    ngOnInit(): void { }

    submit() {
        this.stripeHttpService.createStripePlan(this.model)
            .flatMap(() => this.currentUserHttpService.getStripeInfo())
            .subscribe();

        this.model = new StripePlanInfo();
    }
}
