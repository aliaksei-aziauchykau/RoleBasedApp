import logger from "redux-logger";
import { createStore, combineReducers, applyMiddleware, compose, Store } from "redux";

import counterReducer from "./counter.reducer";
import panelsReducer from "./panels.reducer";

import { StorageService } from "./../services/storage.service";
import { IAppState } from "./app.state";
import * as _ from "lodash";

const loadState = (storage: StorageService) => {
    try {

        if (storage.itemIsExist("state")) {
            const serializedState = storage.getItem("state");
            return JSON.parse(serializedState);
        }
    } catch (error) {
        // log error.
    }
    return undefined;
};

const saveState = (state: IAppState, storage: StorageService) => {
    try {
        const serializedState = JSON.stringify(state);
        storage.setItem("state", serializedState);
    } catch (error) {
        // log error.
    }
};

const configureStore = (storage: StorageService) => {
    const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store: Store<IAppState> = createStore(
        combineReducers({
            counterState: counterReducer,
            panelsState: panelsReducer
        }),
        loadState(storage),
        composeEnhancers(
            applyMiddleware(
                logger
            )
        )
    );
    store.subscribe(_.throttle(() => {
        saveState({
            counterState: store.getState().counterState,
            panelsState: store.getState().panelsState
        }, storage);
    }, 1000));

    return store;
};

export default configureStore;