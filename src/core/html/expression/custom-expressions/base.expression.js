
export class BaseExpression {
    constructor() {
    }

    analyze(domElement, scope) {
        let innerHtml = domElement.innerHTML;
        let html = this.analyzeExpression(innerHtml, scope);
        domElement.innerHTML = html;
        return html;
    }

    execute(expression, scope) {
        let fun = new Function("", this.getExpression(expression));
        let result = fun.call(scope);
        return result;
    }

    getExpression(expression) {
        return `return ${expression}`;
    }

    analyzeExpression() {}
}