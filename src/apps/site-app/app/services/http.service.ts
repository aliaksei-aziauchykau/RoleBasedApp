import { Router } from "@angular/router";
import { ApiInvokerService, ApiInvoker } from "../../../../core/api";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, pipe } from "rxjs/Rx";

import { catchError, tap } from "rxjs/operators";
import { throwError, OperatorFunction, of, BehaviorSubject, MonoTypeOperatorFunction, UnaryFunction } from "rxjs";
import { SettingsService } from "./settings.service";
import { PopupService } from "./popup.service";
import { DataStorageService } from "./data-storage.service";
import { StorageSettings } from "../models/storage-settings";
import { trackExecution } from "../utils/custom-operators";
import { LockerTypeEnum } from "../utils/locker-type.enum";

type UpdateFunc<T> = (service: DataStorageService) => BehaviorSubject<T>;

@Injectable()
export class HttpService {

    private readonly stubFunc: () => void = () => {};

    constructor(
        private readonly router: Router,
        private readonly httpClient: HttpClient,
        private readonly settingsService: SettingsService,
        private readonly popupService: PopupService,
        private readonly dataStorageService: DataStorageService
    ) {
    }

    private getGeneralChain<T>(): UnaryFunction<Observable<T>, Observable<T>> {
        const chain: UnaryFunction<Observable<T>, Observable<T>> = pipe(
            tap<T>(() => this.settingsService.analizeCookie(document.cookie)),
            catchError<T, never>(error => this.handleError(error))
        );

        return chain;
    }

    private getStorageChain<T, K>(storageSettings: StorageSettings, item?: K) {
        const chain = pipe(
            tap<T>(x => storageSettings
                && storageSettings.updateFuncOnResp
                && storageSettings.updateFuncOnResp(this.dataStorageService).next(x)),
            tap<T>(x => storageSettings
                && storageSettings.updateFuncOnBody
                && storageSettings.updateFuncOnBody(this.dataStorageService).next(item))
            );
        return chain;
    }

    public invokeGet<T>(
        endpointUrl: string,
        requestInit = {},
        storageSettings = new StorageSettings()
    ): Observable<T> {

        storageSettings = new StorageSettings(storageSettings);
        if (this.settingsService.settings.isTest) {
            return of<T>();
        }

        const result = this.httpClient.get<T>(endpointUrl, requestInit)
            .pipe(
                this.getGeneralChain(),
                this.getStorageChain(storageSettings),
                trackExecution(storageSettings.trackType)
            );
        return result;
    }

    public invokePost<T, K>(
        endpointUrl: string,
        body: K, requestInit = {},
        storageSettings = new StorageSettings()
    ): Observable<T> {

        storageSettings = new StorageSettings(storageSettings);
        if (this.settingsService.settings.isTest) {
            return of<T>();
        }

        const result = this.httpClient.post<T>(endpointUrl, body, requestInit)
            .pipe(
                this.getGeneralChain(),
                this.getStorageChain(storageSettings, body),
                trackExecution(storageSettings.trackType)
            );
        return result;
    }

    public invokePut<T, K>(
        endpointUrl: string,
        body: K, requestInit = {},
        storageSettings = new StorageSettings()
    ): Observable<T> {

        storageSettings = new StorageSettings(storageSettings);
        if (this.settingsService.settings.isTest) {
            return of<T>();
        }

        const result = this.httpClient.put<T>(endpointUrl, body, requestInit)
            .pipe(
                this.getGeneralChain(),
                this.getStorageChain(storageSettings, body),
                trackExecution(storageSettings.trackType)
            );
        return result;
    }

    public invokeDelete<T>(
        endpointUrl: string,
        requestInit = {},
        storageSettings = new StorageSettings()
    ): Observable<T> {

        storageSettings = new StorageSettings(storageSettings);
        if (this.settingsService.settings.isTest) {
            return of<T>();
        }

        const result = this.httpClient.delete<T>(endpointUrl, requestInit)
            .pipe(
                this.getGeneralChain(),
                this.getStorageChain(storageSettings),
                trackExecution(storageSettings.trackType)
            );
        return result;
    }

    private navigate(url: string) {
        this.router.navigate([url]);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", error.error.message);
        } else {

            this.handler(error);
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.info(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            "Something bad happened; please try again later.");
    }

    handler(error: HttpErrorResponse): void {
        switch (error.status) {
            case 301:
            case 302: {
                this.navigate(error.statusText);
            } break;
            case 400:
            case 401:
            case 402:
            case 403:
            case 404: {
                this.popupService.errorOnHttpCall(error.message);
            } break;
            default: break;
        }
    }

}

