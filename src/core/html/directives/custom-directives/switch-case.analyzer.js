import { CmCaseDirective } from "./cm-case.directive";
import { CmSwitchDirective } from "./cm-switch.directive";
import { AnalyzerSingleton } from "../../../decorators/analyzers/analyzer-singleton.decorator";

@AnalyzerSingleton({
})
export class SwitchCaseAnalyzer {
    constructor() {
        let switchDirective = new CmSwitchDirective();
        let caseDirective = new CmCaseDirective();
        switchDirective.analyzers.push(caseDirective);
        caseDirective.analyzers.push(switchDirective);
        this.analyzers = [switchDirective];
    }

    analyze(domElement, scope) {
        this.analyzers.forEach(analyzer => analyzer.analyze(domElement, scope));
    }
}