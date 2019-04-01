export class Article {
    constructor(article) {
        this.author = article && article.author || null;
        this.title = article && article.title || null;
        this.description = article && article.description || null;
        this.url = article && article.url || null;
        this.urlToImage = article && article.urlToImage || null;
        this.publishedAt = article && article.publishedAt || null;
        this.image = article && article.image || {};
    }
}