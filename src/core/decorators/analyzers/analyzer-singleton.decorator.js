import { Analyzer } from "./analyzer.decorator";
import { Singleton } from "../singleton.decorator";

export function AnalyzerSingleton(config) {
    return function (target) {
        Singleton()(target);
        Analyzer(config)(target);
    }
}