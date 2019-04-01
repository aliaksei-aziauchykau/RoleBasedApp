import { Subject, Observable } from "rxjs";
import { LockerTypeEnum } from "./locker-type.enum";
import { IDictionary } from "../interfaces/dictionary.interface";

export class Locker {
    private static _instance: Locker;
    private lockers: IDictionary<boolean> = {};
    private lockers$: Subject<IDictionary<boolean>> = new Subject();

    constructor() {
    }

    public addLocker(type: LockerTypeEnum, initialState: boolean = false): Locker {
        this.lockers[type] = initialState;
        this.lockers$.next(this.lockers);
        return this;
    }

    public isLocked(type: LockerTypeEnum): boolean {
        return this.lockers[type];
    }

    public lock(type: LockerTypeEnum): void {
        this.set(type, true);
        this.lockers$.next(this.lockers);
    }

    public unlock(type: LockerTypeEnum): void {
        this.set(type, false);
        this.lockers$.next(this.lockers);
    }

    public asObservable(): Observable<IDictionary<boolean>> {
        return this.lockers$.asObservable();
    }

    public set(type: LockerTypeEnum, value: boolean) {
        if (type in this.lockers) {
            this.lockers[type] = value;
        }
    }

    public static get instance(): Locker {
        return this._instance = Boolean(this._instance)
            ? this._instance
            : new Locker()
                .addLocker(LockerTypeEnum.UserInfoGet)
                .addLocker(LockerTypeEnum.AllProductGet);
    }

    public static wrap<T>(observable: Observable<T>, type: LockerTypeEnum, instance: Locker = this.instance): Observable<T> {
        return Observable.of({})
            .do(_ => instance.lock(type))
            .flatMap(_ => observable)
            .do(_ => instance.unlock(type));
    }
}