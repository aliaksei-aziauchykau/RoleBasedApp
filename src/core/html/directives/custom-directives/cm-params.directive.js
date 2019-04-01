import { BaseDirective } from "./base.directive";
import { DirectiveAnalyzerSingleton } from "../../../decorators/analyzers/directive-analyzer-singleton.decorator";

@DirectiveAnalyzerSingleton({
    directiveName: "cmParams"
})
export class CmParamsDirective extends BaseDirective {
    constructor() {
        super();
    }

    analyze(domElement, scope) {
        let params = {};
        if(domElement.hasAttribute(this.directiveName) || 
            domElement.hasAttribute(this.directiveName.toLowerCase())) {
            params = super.execute(domElement, scope);
            this.removeDirective(domElement);
        }
        return params;
    }
}