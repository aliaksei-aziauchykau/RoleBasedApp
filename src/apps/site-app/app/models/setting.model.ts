
export class SettingsModel {
    public apiServer: string;
    public stripePublicKey: string;
    public stripeAppKey: string;
    public isDevelopment: boolean;
    public isTest: boolean;
    public isHerokuDeploy: boolean;
    public stripeRedirectPath: string;
    private readonly development: string = "development";
    constructor(env: any) {
        this.apiServer = env.API_SERVER || null;
        this.isDevelopment = env.NODE_ENV === this.development;
        this.stripePublicKey = env.STRIPE_PB_KEY || null;
        this.stripeAppKey = env.STRIPE_APP_KEY || null;
        this.isTest = env.IS_TEST || false;
        this.isHerokuDeploy = env.IS_HEROKU_DEPLOY || false;
        this.stripeRedirectPath = this.isHerokuDeploy ? `https://${window.location.hostname}/user` : "http://localhost:3001/user"; 
    }
}