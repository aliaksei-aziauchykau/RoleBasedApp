import { UserRoleEnum } from "../enums/user-role.enum";

export class RegistrationInfoModel {
    public email: string;
    public password: string;
    public nickName: string;
    public confirmPassword: string;
    public role: UserRoleEnum;
}