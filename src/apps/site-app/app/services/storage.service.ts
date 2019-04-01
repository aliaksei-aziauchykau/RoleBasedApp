import { Injectable } from "@angular/core";

@Injectable()
export class StorageService  {
    private storage: any;
    constructor() {
        this.storage = localStorage;
    }

    getItem(key: string) {
        return this.storage.getItem(key);
    }

    setItem(key: string, value: string) {
        this.storage.setItem(key, value);
    }

    removeItem(key: string) {
        this.storage.removeItem(key);
    }

    itemIsExist(key: string) {
        return this.getItem(key) !== null;
    }
}