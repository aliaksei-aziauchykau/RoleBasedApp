import { Observable } from "rxjs/Rx";
import { filter, tap, takeUntil, first, mergeMap, finalize } from "rxjs/operators";
import { Subject, pipe, UnaryFunction } from "rxjs";
import { LockerTypeEnum } from "./locker-type.enum";
import { Locker } from "./locker";

export const check = <T>(unsubscriber: Subject<{}>, localItem: T, assign: (item: T) => void): UnaryFunction<Observable<{}>, Observable<T>> => {
    const operator = pipe(
        takeUntil(unsubscriber),
        filter<T>(x => x !== null && x !== undefined && x !== localItem),
        tap<T>(x => assign(x))
    );
    return operator;
};

export const firstExtended = <T>(unsubscriber: Subject<{}>, localItem: T, assign: (item: T) => void): UnaryFunction<Observable<{}>, Observable<T>> => {
    const operator = pipe(
        takeUntil(unsubscriber),
        first<T>(x => x !== null && x !== undefined && x !== localItem),
        tap<T>(x => assign(x))
    );
    return operator;
};

export const trackExecution = <T>(type: LockerTypeEnum, locker: Locker = Locker.instance) => (source: Observable<T>) => {
    const observable = new Observable<T>(observer => {

      const wrapSource = Observable.of({}).pipe(
        tap(x =>  { locker.lock(type); console.log(locker, "a"); }),
        mergeMap(() => source),
        finalize(() => { locker.unlock(type); console.log(locker, "b"); })
      );

      const unsubcribe = wrapSource.subscribe({
        next(x) { observer.next(x); },
        error(error) { observer.error(error); },
        complete() { observer.complete(); }
      });
      return unsubcribe;
    });
    return observable;
};