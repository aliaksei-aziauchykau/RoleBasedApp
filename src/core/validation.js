import { Singleton } from "./decorators/singleton.decorator";

export const ValidationConditions = { 
    ApiKeyField: [
        { action: (value) => value.length == 31, errorMessage: "The api field should has more 31 symbols" },
        { action: (value) => value.length != 32, errorMessage: "The api field should has 32 symbols" }
    ],
    RequiredField: [
        { action: (value) => !Boolean(value) || value === "", errorMessage: "The field is required" },
    ],
    OtherField: null
}

@Singleton()
export class ValidationFactory {
    
    getValidator(conditions) {
        let proxy = new Proxy({}, this.getProxy(conditions));
        return { validate: (value, failCallback) => {
            try {
                proxy.value = value
            }
            catch (error) {
                if(Boolean(failCallback)) {
                    failCallback(error, value);
                }
                return null;
            }
            return value;
        }}
     }

     getProxy(conditions) {
         let validator = {
             set: (obj, prop, value) => {
                if(value === undefined || value === null) throw new Error("Validator: value undefined or null");
                if(conditions !== null || conditions.length !== 0) {
                     for(let condition of conditions) {
                         this.validate(value, condition.action, condition.errorMessage)
                     }
                }
                obj[prop] = value;
                return true;
             }
         }
         return validator;
     }

     validate(value, condition, message) {
          if(condition(value)) throw new Error(message);
     }
}