import { Constants } from "./constants";

export class Endpoints {
    static NewsApi = (replacements) => `https://newsapi.org/v1/articles?source=bbc-news&apiKey=${replacements.apiKey}`;
    static Articles = (replacements) => `${Constants.apiServer}/api/news/${replacements && replacements.id || ""}`;

    static Todos = (replacements) => `${Constants.apiServer}/api/todos/${replacements && replacements.id || ""}`;
    static StripeCharge = () => `${Constants.apiServer}/api/stripe/charge/`;

    static Users = (rep) => `${Constants.apiServer}/api/users${rep && rep.id && `/${rep.id}` || ""}`;
    static Products = (replacements) => `${Constants.apiServer}/api/products/${replacements && replacements.id || ""}`;
    static Stripe = (replacements) => `${Constants.apiServer}/api/stripe/${replacements && replacements.id || ""}`;
    static Posts = (replacements) => `${Constants.apiServer}/api/posts/${replacements && replacements.id || ""}`;
    static Sessions = (replacements) => `${Constants.apiServer}/api/sessions/${replacements && replacements.id || ""}`;

    // Auth
    static Login = () => `${Constants.apiServer}/api/auth/login`;
    static Logout = () => `${Constants.apiServer}/api/auth/logout`;
    static Registration = () => `${Constants.apiServer}/api/auth/registration`
}