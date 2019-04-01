import { MatGenericTable } from "../../../infrastructure/material/models/mat-generic-table.abstract";
import { UserInfoModel, UserInfoListModel } from "../../../../models/user.view.models";
import { ICrudService } from "../../../../interfaces/crud-service.interface";
import { UserHttpService } from "../../../../services/http-services/user.http.service";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "mc-mat-user-table",
    templateUrl: "../common/table-templates/common-table.component.html",
    styleUrls: ["../common/table-templates/common-table.component.scss"],
    // changeDetection: ChangeDetectionStrategy.Default
})
export class MatUserDataTableComponent extends MatGenericTable<UserInfoModel, UserInfoListModel> {

    columns: string[] = Object.keys(new UserInfoModel());
    protected readonly crudService: ICrudService<UserInfoModel, UserInfoListModel>;

    constructor(private readonly userHttpService: UserHttpService) {
        super();
        this.crudService = userHttpService;
    }
}