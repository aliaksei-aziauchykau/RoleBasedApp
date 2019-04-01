
class Article {
    constructor() {
        this.author = "";
        this.title = "";
        this.description = "";
        this.url = "";
        this.urlToImage = "";
        this.publishedAt = (new Date()).toISOString();
        this.image = { data: null, contentType: null };
    }

    static configMongoose() {
        let mongoseConfig =  {
            author: String,
            title: String,
            description: String,
            url: String,
            urlToImage: String,
            publishedAt: String,
            image: { data: String , contentType: String }
        };

        return {
            name: "Article",
            collection: "articles",
            mongoseConfig
        }
    }
}

module.exports = Article;