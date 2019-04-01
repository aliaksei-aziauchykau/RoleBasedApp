import { Observable } from "rxjs";
import { StorageSettings } from "../models/storage-settings";

export interface ICrudService<TEntity, TListEntity> {
    getAll(queryParams?: {}, storageSettings?: StorageSettings): Observable<TListEntity>;
    get(id: string, storageSettings?: StorageSettings): Observable<TEntity>;
    add(entity: TEntity, storageSettings?: StorageSettings): Observable<{}>;
    update(id: string, entity: TEntity, storageSettings?: StorageSettings): Observable<{}>;
    remove(id: string, storageSettings?: StorageSettings): Observable<{}>;
}