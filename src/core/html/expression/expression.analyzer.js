import { AnalyzerSingleton } from "../../decorators/analyzers/analyzer-singleton.decorator";
import { ContentExpression } from "./custom-expressions/content.expression";

@AnalyzerSingleton({
    analyzers: [
        ContentExpression.i()
    ]
})
export class ExpressionAnalyzer {
    constructor() {
    }
}