import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { Observable } from "rxjs";
import { Endpoints } from "../../../../../core/endpoints";
import { StripeInfoModel, StripePlanInfo } from "../../models/stripe.view.models";
import { StorageSettings } from "./../../models/storage-settings";
import { Constants } from "../../../../../core/constants";
import { PostInfoModel } from "../../models/post-info.modet";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class PostHttpService {

    constructor(
        private readonly httpService: HttpService
    ) {}

    public getAllPosts(productPath: string): Observable<PostInfoModel[]> {

        const params = new HttpParams().set("page", "1").set("limit", "1");

        const source = this.httpService.invokeGet<PostInfoModel[]>(
            Endpoints.Posts({id: productPath}),
            undefined,
            undefined
        );

        return source;
    }

    public createPost(productPath: string, post: PostInfoModel): Observable<{}> {

        const source = this.httpService.invokePost<PostInfoModel, {}>(
            Endpoints.Posts({id: productPath}),
            post,
            undefined,
            undefined
        );
        return source;
    }
}