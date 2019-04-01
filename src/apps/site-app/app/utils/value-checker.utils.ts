
export class ValueChecker {
    public static getValue<T>(value: T, defaultValue: T): T {
        return value === null || value === undefined ? defaultValue : value;
    }

    public static isNullOrEmptyString(value: string) {
        const result = value === undefined || value === null || value === "";
        return result;
    }

    public static isValidBoolean(value: boolean): boolean {
        return value !== undefined && value !== null;
    }

    public static isValid<T>(value: T): boolean {
        const result: boolean = value !== null && value !== undefined;
        return result;
    }

    public static isValidOrDefault<T>(value: T, defaultValue: T): T {
        const result: T = this.isValid(value) ? value : defaultValue;
        return result;
    }

    public static isValidArguments<T>(args: any[], returnValue: T, defaultValue: T = null): T {
        const hasInvalid = args.some(arg => !this.isValid(arg));
        const result: T = hasInvalid ? defaultValue : returnValue;
        return result;
    }
}