import { Singleton } from "../decorators/singleton.decorator";

@Singleton()
export class CommandService {
    updateArticles = new Rx.Subject();
    removeArticle = new Rx.Subject();
}