import { Singleton } from "../decorators/singleton.decorator";

@Singleton()
export class RegexStoreService {
    constructor(){

    }

    filterRegex(value) {
        let reg = new RegExp(value, "i");
        return reg;
    }

    filterArticlesByTitle(articles, filterValue) {
        let reg = this.filterRegex(filterValue);
        let articlesFiltered = articles.filter(article => !filterValue || reg.test(article.title || ""));
        return articlesFiltered;
    }
}