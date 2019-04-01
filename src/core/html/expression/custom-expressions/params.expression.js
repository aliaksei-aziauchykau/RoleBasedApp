import { ExpressionAnalyzerSingleton } from "../../../decorators/analyzers/content-analyzer-singleton.decorator";
import { BaseExpression } from "./base.expression";

@ExpressionAnalyzerSingleton({
    pattern: /cmParams="(.*)"/ig
})
export class ParamsExpression extends BaseExpression {
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

    applyExpression(content, scope) {
        let result = content.replace(this.pattern, () => {
            let newResult = this.execute(scope);
            return newResult;  
        });
        return result; 
    }

    execute(scope) {
        let str = JSON.stringify(scope);
        str = str.replace(/\"/g, "'");
        return `cmParams="${str}"`;
    }
}