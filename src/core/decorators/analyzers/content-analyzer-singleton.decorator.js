import { AnalyzerSingleton } from "./analyzer-singleton.decorator";

export function ExpressionAnalyzerSingleton(config) {
    return function (target) {
        target.prototype.pattern = config.pattern;
        AnalyzerSingleton(config)(target);
    }
}