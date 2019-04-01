export class Mapper {
    static mapProperties(source, destination, handler) {
        if (!source) return;
        for (let index in source) {
            if (!source.hasOwnProperty(index)) continue;
            let objectIndex = this.firstLetterToLowerCase(index);
            if (typeof source[index] === "string" ||
                typeof source[index] === "number" ||
                typeof source[index] === "boolean") {
                destination[objectIndex] = source[index];
            }
        }
        if (handler) {
           handler(source, destination);
        }
        return destination;
    }

    static firstLetterToLowerCase(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
}