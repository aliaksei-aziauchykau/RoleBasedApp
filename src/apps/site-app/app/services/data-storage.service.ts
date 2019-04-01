import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { UserInfoModel } from "../models/user.view.models";
import { ProductInfo } from "../models/product-info.model";
import { StripeInfoModel } from "../models/stripe.view.models";
import { PostInfoModel } from "../models/post-info.modet";
import { AuthResponseModel } from "../models/auth-response.model";
import { SessionInfo } from "../models/session-info.model";

@Injectable()
export class DataStorageService {
    public allProducts: BehaviorSubject<ProductInfo[]> = new BehaviorSubject(null);
    public productInfoCurrent: BehaviorSubject<ProductInfo> = new BehaviorSubject(null);
    public stripeInfoCurrent: BehaviorSubject<StripeInfoModel> = new BehaviorSubject(null);
    public postsCurrent: BehaviorSubject<PostInfoModel[]> = new BehaviorSubject([]);

    public allUsers: BehaviorSubject<UserInfoModel[]> = new BehaviorSubject([]);
    public userInfoCurrent: BehaviorSubject<UserInfoModel> = new BehaviorSubject(null);
    public sessionInfoCurrent: BehaviorSubject<SessionInfo> = new BehaviorSubject(null);
}