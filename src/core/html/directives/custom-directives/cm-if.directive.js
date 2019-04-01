import { BaseDirective } from "./base.directive";
import { DirectiveAnalyzerSingleton } from "../../../decorators/analyzers/directive-analyzer-singleton.decorator";

@DirectiveAnalyzerSingleton({
    directiveName: "cmIf"
})
export class CmIfDirective extends BaseDirective {
    constructor() {
        super();
    }

    analyzeDirective(innerDomElement, scope) {
        if(this.checkDirective(innerDomElement, scope)) {
            this.applyDirective(innerDomElement)
        }
    }

    checkDirective(innerDomElement, scope) {
        return !super.execute(innerDomElement, scope);
    }

    applyDirective(innerDomElement) {
        innerDomElement.remove();
    }
}