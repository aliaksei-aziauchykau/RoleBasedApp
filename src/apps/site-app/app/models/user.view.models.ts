import { ICrudEntity, ICrudListEntity } from "../interfaces/crud-entity.interface";

export class UserInfoModel implements ICrudEntity {
    public id: string = null;
    public nickName: string = null;
    public email: string = null;
}

export class UserInfoListModel implements ICrudListEntity<UserInfoModel> {
    public items: UserInfoModel[];
    public count: number;
}