export class Guid {
    static create() {
        let id = "_" + Math.random()
            .toString(36)
            .substr(2, 9);
        return id;
    }
}