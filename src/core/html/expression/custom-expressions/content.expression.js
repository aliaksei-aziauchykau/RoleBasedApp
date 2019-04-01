import { ExpressionAnalyzerSingleton } from "../../../decorators/analyzers/content-analyzer-singleton.decorator";
import { BaseExpression } from "./base.expression";

@ExpressionAnalyzerSingleton({
    pattern: /{{.*?}}/g
})
export class ContentExpression extends BaseExpression {
    constructor() {
        super();
    }

    analyzeExpression(html, scope) {
        let result = html;
        if(this.pattern.test(html)) {
            result = this.applyExpression(html, scope);
        }
        return result;
    }

    applyExpression(html, scope) {
        let result = html.replace(this.pattern, (str) => {
            let strToProcess = str.substring(2, str.length - 2).replace(/amp;/g, "");
            return this.execute(strToProcess, scope);   
        });
        return result; 
    }
}