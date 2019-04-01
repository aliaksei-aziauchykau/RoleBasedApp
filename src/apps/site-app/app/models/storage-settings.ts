import { DataStorageService } from "../services/data-storage.service";
import { BehaviorSubject } from "rxjs";
import { LockerTypeEnum } from "../utils/locker-type.enum";
import { ValueChecker } from "../utils/value-checker.utils";

export class StorageSettings {
    public updateFuncOnBody: <K>(service: DataStorageService) => BehaviorSubject<K>;
    public updateFuncOnResp: <T>(service: DataStorageService) => BehaviorSubject<T>;
    public trackType: LockerTypeEnum;

    constructor(data?: StorageSettings) {
        this.updateFuncOnBody = data && data.updateFuncOnBody || null;
        this.updateFuncOnResp = data && data.updateFuncOnResp || null;
        this.trackType = data && ValueChecker.isValid(data.trackType) ? data.trackType : LockerTypeEnum.HttpCall;
    }
}