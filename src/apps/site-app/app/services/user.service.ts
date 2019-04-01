import { Injectable } from "@angular/core";
import { UserInfoModel } from "../models/user.view.models";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UserService {
    public $userInfo: BehaviorSubject<UserInfoModel> = new BehaviorSubject(null);
}