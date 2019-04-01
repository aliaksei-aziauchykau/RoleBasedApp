export class Store {
    constructor(reducer) {
        this.reducer = reducer;
        this.listeners = [];
        this.dispatch({});
    }

    static createStore = (reducer) => {
        return new Store(reducer);
    }

    dispatch = (action) => {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach(listener => listener());
    }

    getState = () => this.state;

    subscribe = (listener) => {
        this.listeners.push(listener);
        return () => this.listeners = this.listeners.filter(l => l !== listener);
    }
}