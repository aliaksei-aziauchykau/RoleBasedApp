import { BaseDirective } from "./base.directive";
import { DirectiveAnalyzerSingleton } from "../../../decorators/analyzers/directive-analyzer-singleton.decorator";

@DirectiveAnalyzerSingleton({
    directiveName: "cmSwitch"
})
export class CmSwitchDirective extends BaseDirective {
    constructor() {
        super();
    }

    analyzeDirective(innerDomElement, scope) {
        let value = super.execute(innerDomElement, scope);
        this.analyzers.forEach(analyzer => analyzer.analyze(innerDomElement, scope, value));
    }
}