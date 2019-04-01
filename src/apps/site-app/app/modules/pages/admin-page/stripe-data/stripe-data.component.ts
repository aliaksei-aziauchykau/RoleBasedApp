import { MatGenericTable } from "../../../infrastructure/material/models/mat-generic-table.abstract";
import { UserInfoModel, UserInfoListModel } from "../../../../models/user.view.models";
import { ICrudService } from "../../../../interfaces/crud-service.interface";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { StripeInfoModel, StripeInfoListModel } from "../../../../models/stripe.view.models";
import { StripeHttpService } from "../../../../services/http-services/stripe.http.service";

@Component({
    selector: "mc-mat-stripe-table",
    templateUrl: "../common/table-templates/common-table.component.html",
    styleUrls: ["../common/table-templates/common-table.component.scss"],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatStripeDataTableComponent extends MatGenericTable<StripeInfoModel, StripeInfoListModel> {

    columns: string[] = Object.keys(new StripeInfoModel());
    protected readonly crudService: ICrudService<StripeInfoModel, StripeInfoListModel>;

    constructor(private readonly stripeHttpService: StripeHttpService) {
        super();
        this.crudService = stripeHttpService;
    }
}