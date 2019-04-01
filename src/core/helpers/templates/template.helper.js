import { Singleton } from "../../../core/decorators/singleton.decorator";

@Singleton()
export class TemplateHelpers {
    constructor() {
    }
    
    static async getArticleTemplate(data) {
        await import(/* webpackChunkName: "oolod" */ "./partial-styles/article.scss");
        const template = `${data.articles.map(article => `
            <li>
                <article>
                    <h4 class="header">${article.title}</h4>
                    <img class="image" src="${article.urlToImage}">
                    <div class="description">${article.description}</div>
                    <a class="source" href="${article.url}">Source</a>
                    <div class="author">${article.author}</div>
                    <div class="time">${TemplateHelpers.i().getActualDate(article.publishedAt)}</div>
                </article>
            </li>
        `)}`;
        
        return template;
    }

    static async getCarouselTemplate(data) {
        const carouselTemplate = `
        <ol class="carousel-indicators">
            ${data.articles.map((article, index) => `
                <li data-target="#carouselExampleIndicators" data-slide-to="${index}" ${index === 0 ? "class='active'" : ""}></li>`).join("")}
        </ol>
        <div class="carousel-inner">
            ${data.articles.map((article, index) => `
                <div class="carousel-item ${index === 0 ? "active" : ""}">
                    <img class="d-block w-100" src="${article.urlToImage}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${article.title}</h5>
                        <p>${article.description}</p>
                        <a href="${article.url}">Source</a>
                        <p>${article.author}</p>
                    </div>
                </div>`).join("")}
        </div>`;
        
        return carouselTemplate;
    }

    formatArticles(articles) {
        return articles.map(article => {
             article.publishedAt = this.getActualDate(article.publishedAt);
             return article;
        });
    }

    getActualDate(str) {
        let result = str === null 
            ? ""
            : str.substring(0, 10);

        return result;
    }

}

export const TemplateHelperService = TemplateHelpers.i();
export const getArticleTemplate = async (data) => TemplateHelpers.getArticleTemplate(data)
export const getCarouselTemplate = async (data) => TemplateHelpers.getCarouselTemplate(data)