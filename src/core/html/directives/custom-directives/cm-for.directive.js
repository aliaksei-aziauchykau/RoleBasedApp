import { BaseDirective } from "./base.directive";
import { DirectiveAnalyzerSingleton } from "../../../decorators/analyzers/directive-analyzer-singleton.decorator";
import { ContentExpression } from "../../expression/custom-expressions/content.expression";
import { ParamsExpression } from "../../expression/custom-expressions/params.expression";

@DirectiveAnalyzerSingleton({
    directiveName: "cmFor"
})
export class CmForDirective extends BaseDirective {
    constructor() {
        super();
    }

    analyzeDirective(innerDomElement, scope) {
        let result = this.execute(innerDomElement, scope);
        innerDomElement.innerHTML = result;
    }

    execute(innerDomElement, scope) {
        let expression = innerDomElement.getAttribute(this.directiveName);
        let innerHtml = innerDomElement.innerHTML;
        let body = this.getBodyExpression(expression, innerHtml);
        let fun = new Function("innerHtml", "transformParams", "transformExpression", body);
        let result = fun.call(scope, innerHtml, this.transformParams, this.transformExpression);
        return result;
    }

    getBodyExpression(expression, innerHtml) {
        let paramVariableName = this.getParamVariableName(innerHtml);
        let forVariableName = this.getForVariableName(expression);
        let check = Boolean(paramVariableName) ? "true" : "false"; 
        return `
        let result = "";
        let index = 0;
        for(${expression})
        {
            let html = innerHtml;
            if(${check}) {
                html = transformParams(html, ${paramVariableName});
            }
            html = transformExpression(html, { ${forVariableName}: ${forVariableName}, index, scope: this });
            result += html;
            index++;
        }
        return result;`
    }

    getParamVariableName(innerHtml) {
        let regResult = innerHtml.match(/cmParams="(.*)"/i);
        return Boolean(regResult) ? regResult[1] : null;
    }

    getForVariableName(expression) {
        let result = expression.replace(/\s+/g, " ").split(" ")[1];
        return result;
    }

    transformExpression(innerHtml, scope) {
        return ContentExpression.i().analyzeExpression(innerHtml, scope);

    }

    transformParams(innerHtml, scope) {
        return ParamsExpression.i().analyzeExpression(innerHtml, scope);
    }
}