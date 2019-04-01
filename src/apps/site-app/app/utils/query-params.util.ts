import { HttpParams } from "@angular/common/http";
import { ValueChecker } from "./value-checker.utils";

export const getQueryParams = (obj: {} = {}) => {
    let httpParams: HttpParams = new HttpParams();
    Object.keys(obj)
        .filter(key => !ValueChecker.isNullOrEmptyString(obj[key]))
        .forEach(key => httpParams = httpParams.set(key, obj[key]));
    return httpParams;
};