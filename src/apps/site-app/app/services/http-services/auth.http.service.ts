import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { Endpoints } from "../../../../../core/endpoints";
import { AuthResponseModel } from "../../models/auth-response.model";

@Injectable()
export class AuthHttpService {

    constructor(
        private readonly httpService: HttpService
    ) {}

    public login(loginModel: any) {
        const source = this.httpService.invokePost<AuthResponseModel, {}>(
            Endpoints.Login(),
            loginModel,
            undefined,
            undefined
        );
        return source;
    }

    public logout() {
        const source = this.httpService.invokePost<AuthResponseModel, {}>(
            Endpoints.Logout(),
            {},
            undefined,
            undefined
        );
        return source;
    }
}