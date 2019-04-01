import { Singleton } from "../decorators/singleton.decorator";

@Singleton()
export class Storage  {
    constructor(storage) {
        this.storage = storage || localStorage; 
    }

    getItem(key) {
        return this.storage.getItem(key);
    }

    setItem(key, value) {
        this.storage.setItem(key, value);
    }
    
    removeItem(key) {
        this.storage.removeItem(key);
    } 

    itemIsExist(key) {
        return this.getItem(key) !== null; 
    }
}

export const StorageService = Storage.i();