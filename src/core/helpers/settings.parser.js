import { Singleton } from "../decorators/singleton.decorator";
const development = "development";

@Singleton()
class SettingsParser {
    settings
    parse(env) {
        const rawSettings = 
        { 
            NODE_ENV: env.NODE_ENV,
            STRIPE_PB_KEY: env.STRIPE_PB_KEY
        };

        const settings = {
            isDevelopmet: rawSettings.NODE_ENV === development,
            stripePublicKey: rawSettings.STRIPE_PB_KEY
        }
        this.settings = settings;
        return settings;
    }
}

export const SettingsParserService = SettingsParser.i();

