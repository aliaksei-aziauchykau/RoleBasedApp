import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { UserInfoModel, UserInfoListModel } from "../../models/user.view.models";
import { Endpoints } from "../../../../../core/endpoints";
import { CrudHttpService } from "./crud.http.service";

@Injectable()
export class UserHttpService extends CrudHttpService<UserInfoModel, UserInfoListModel> {

    constructor(
        protected readonly httpService: HttpService
    ) {
        super(httpService, Endpoints.Users);
    }
}