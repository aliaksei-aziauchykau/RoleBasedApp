import { DirectiveAnalyzer } from "./directives/directive.analyzer";
import { AnalyzerSingleton } from "../decorators/analyzers/analyzer-singleton.decorator";
import { ExpressionAnalyzer } from "./expression/expression.analyzer";

@AnalyzerSingleton({
    analyzers: [
        DirectiveAnalyzer.i(),
        ExpressionAnalyzer.i()
    ]
})
export class HtmlAnalyzer {}