
export function Singleton() {
    return function (target) {
        target.i = function() {
            return this.instance = !this.instance
                ? new target()
                : this.instance;
        }
    }
}