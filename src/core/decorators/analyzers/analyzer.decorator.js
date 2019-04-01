

export function Analyzer(config) {
    return function (target) {
        target.prototype.analyzers = config.analyzers || [];
        target.prototype.analyze = target.prototype.analyze || function(domElement, scope, payload) {
            this.analyzers.forEach(analyzer => analyzer.analyze(domElement, scope, payload));
        };
    }
}