import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { Observable } from "../../../../../../node_modules/rxjs";
import { Endpoints } from "../../../../../core/endpoints";
import { StorageSettings } from "../../models/storage-settings";
import { LockerTypeEnum } from "../../utils/locker-type.enum";
import { SessionInfo } from "../../models/session-info.model";

@Injectable()
export class SessionHttpService {

    constructor(
        private readonly httpService: HttpService
    ) {}

    public getSessionInfo(id: string = "", storageSettings?: StorageSettings): Observable<SessionInfo> {
        const source = this.httpService.invokeGet<SessionInfo>(
            Endpoints.Sessions({id}),
            undefined,
            <StorageSettings>{ ...storageSettings, trackType: LockerTypeEnum.SessionInfoGet }
        );
        return source;
    }
}