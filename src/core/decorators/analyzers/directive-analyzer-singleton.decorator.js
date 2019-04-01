import { AnalyzerSingleton } from "./analyzer-singleton.decorator";

export function DirectiveAnalyzerSingleton(config) {
    return function (target) {
        target.prototype.directiveName = config.directiveName;
        AnalyzerSingleton(config)(target);
    }
}