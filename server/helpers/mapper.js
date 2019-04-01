
class Mapper {
    static mapProperties(source, destination, handler, ignore, extend) {
        const result = this.mapPropertiesInner(source, destination, handler, ignore, extend, true);
        return result;
    }
    
    static mapSimpleProperties(source, destination, handler, ignore, extend) {
        const result = this.mapPropertiesInner(source, destination, handler, ignore, extend, false);
        return result;
    }
    
    static mapPropertiesInner(source, destination, handler, ignore, extend, includeObject) {
        if (!source) return;
        
        for (let index in destination) {
            if (!(index in source)) continue;
            let objectIndex = this.firstLetterToLowerCase(index);
            let flag = ignore && ignore(index) || true;
            const includeObjectFlag = includeObject ? typeof source[index] === "object" : false;
            if ((typeof source[index] === "string" ||
                typeof source[index] === "number" ||
                typeof source[index] === "boolean" || 
                includeObjectFlag) && flag) {
                destination[objectIndex] = source[index];
            }
        }
        if (handler) {
           handler(source, destination);
        }

        if (extend) {
            Object.assign(destination, extend)
        }
        return destination;
    }

    static mapToClass(type, source, handler) {
        if (!source) return null;
        let destination = new type(source);
        if (handler) {
            destination = handler(source,  destination);
        }
        return destination;
    }

    static mapToArray(type, source, handler) {
        if (!source) return null;
        return source.map(src => {
            let destination = this.mapToClass(type, src);
            if (handler) {
                destination = handler(src, destination);
            }
            return destination;
        });
    }

    static firstLetterToLowerCase(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
}

module.exports = Mapper;