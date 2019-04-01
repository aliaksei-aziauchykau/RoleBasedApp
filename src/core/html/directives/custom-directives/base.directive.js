export class BaseDirective {
    constructor() {
    }

    query() {
        return `[${this.directiveName}]`;
    }

    analyze(domElement, scope, payload) {
        const directiveQuery = this.query(); 
        let innerDomElement;
        do {
            innerDomElement = this.findDirective(domElement, directiveQuery);
            if (Boolean(innerDomElement)) {
                this.analyzeDirective(innerDomElement, scope, payload);
                this.removeDirective(innerDomElement);
            }
        } while(Boolean(innerDomElement));
    }

    findDirective(domElement, directiveQuery) {
        let innerDomElement = domElement.querySelector(directiveQuery);
        return innerDomElement;
    }

    removeDirective(domElement) {
        domElement.removeAttribute(this.directiveName);
    }

    execute(innerDomElement, scope) {
        let value = innerDomElement.getAttribute(this.directiveName);
        let fun = new Function("", this.getExpression(value));
        let result = fun.call(scope);
        return result;
    }

    getExpression(expression) {
        return `return ${expression}`;
    } 

    analyzeDirective() { }
}