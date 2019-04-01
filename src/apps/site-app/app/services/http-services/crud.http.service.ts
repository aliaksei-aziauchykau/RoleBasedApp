import { ICrudService } from "../../interfaces/crud-service.interface";
import { StorageSettings } from "../../models/storage-settings";
import { Observable } from "rxjs";
import { getQueryParams } from "../../utils/query-params.util";
import { HttpService } from "../http.service";

export class CrudHttpService<TEntity, TEntityList> implements ICrudService<TEntity, TEntityList> {

    private endpoint: (replacements?: {}) => string;

    constructor(protected readonly httpService: HttpService,
        endpoint: (replacements?: {}) => string
        ) {
            this.endpoint = endpoint;
    }

    getAll(queryParams?: {}, storageSettings?: StorageSettings): Observable<TEntityList> {
        const source = this.httpService.invokeGet<TEntityList>(
            this.endpoint(),
            { params: getQueryParams(queryParams) },
            <StorageSettings>{ ...storageSettings }
        );

        return source;
    }

    get(id: string, storageSettings?: StorageSettings): Observable<TEntity> {
        const source = this.httpService.invokeGet<TEntity>(
            this.endpoint({id}),
            undefined,
            <StorageSettings>{ ...storageSettings }
        );
        return source;
    }

    add(entity: TEntity, storageSettings?: StorageSettings): Observable<{}> {
        const source = this.httpService.invokePost<{}, TEntity>(
            this.endpoint(),
            entity,
            undefined,
            <StorageSettings>{ ...storageSettings  }
        );
        return source;
    }

    update(id: string, entity: TEntity, storageSettings?: StorageSettings): Observable<{}> {
        const source = this.httpService.invokePut<{}, TEntity>(
            this.endpoint({id}),
            entity,
            undefined,
            <StorageSettings>{ ...storageSettings  }
        );
        return source;
    }

    remove(id: string, storageSettings?: StorageSettings): Observable<{}> {
        const source = this.httpService.invokeDelete<{}>(
            this.endpoint({id}),
            undefined,
            <StorageSettings>{ ...storageSettings  }
        );
        return source;
    }
}