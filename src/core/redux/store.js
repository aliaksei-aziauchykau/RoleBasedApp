export class Store {
    constructor(reducer, initialState = {}) {
        this.reducer = reducer;
        this.listeners = [];
        this.stateObservable = new Rx.BehaviorSubject(initialState);
        this.dispatch(initialState);
    }

    static createStore(reducer) {
        return new Store(reducer);
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.stateObservable.next(this.state);
        this.listeners.forEach(listener => listener(this.state));
    }

    get state$() {
        return this.stateObservable.asObservable();
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => this.listeners = this.listeners.filter(l => l !== listener);
    }
}