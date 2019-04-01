import { BaseDirective } from "./base.directive";
import { DirectiveAnalyzerSingleton } from "../../../decorators/analyzers/directive-analyzer-singleton.decorator";
@DirectiveAnalyzerSingleton({
    directiveName: "cmCase",
})
export class CmCaseDirective extends BaseDirective {
    constructor() {
        super();
    }

    analyzeDirective(innerDomElement, scope, switchValue) {
        this.analyzers.forEach(analyzer => analyzer.analyze(innerDomElement, scope));
        let caseValue = super.execute(innerDomElement, scope);
        if(switchValue !== caseValue) {
            this.applyDirective(innerDomElement)
        }
    }

    applyDirective(innerDomElement) {
        innerDomElement.remove();
    }
}