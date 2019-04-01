const development = "development";

class SettingsParser {
    parse(env) {
        const rawSettings = 
        { 
            NODE_ENV: this.getVariable(env.NODE_ENV),
            APP_TYPE: this.getVariable(env.APP_TYPE),
            DB_LOCAL: this.getVariable(env.DB_LOCAL, false),
            DB_NAME_DEFAULT: this.getVariable(env.DB_NAME_DEFAULT),
            DB_LOGIN: this.getVariable(env.DB_LOGIN),
            DB_PASSWORD: this.getVariable(env.DB_PASSWORD),
            DB_SHARD0: this.getVariable(env.DB_SHARD0),
            DB_SHARD1: this.getVariable(env.DB_SHARD1),
            DB_SHARD2: this.getVariable(env.DB_SHARD2),
            DB_PORT: this.getVariable(env.DB_PORT),
            DB_REPLICASET: this.getVariable(env.DB_REPLICASET),
            DB_ADDITIONAL: this.getVariable(env.DB_ADDITIONAL),
            STRIPE_PR_KEY: this.getVariable(env.STRIPE_PR_KEY),
            STRIPE_APP_KEY: this.getVariable(env.STRIPE_APP_KEY),
            DB_SETUP_INDEXES: this.getVariable(env.DB_SETUP_INDEXES, false),
            DB_PATH: this.getVariable(env.DB_PATH),
        };

        const settings = {
            isDevelopmet: rawSettings.NODE_ENV === development,
            appType: rawSettings.APP_TYPE,
            dbConnection: rawSettings.DB_LOCAL 
                ? this.getLocalDbConnection(rawSettings) 
                : this.getRemoteDbConnection(rawSettings),
            stripePrivateKey: rawSettings.STRIPE_PR_KEY,
            stripeAppKey: rawSettings.STRIPE_APP_KEY,
            isSetupDbIndexes: rawSettings.DB_SETUP_INDEXES,
            dbPath: rawSettings.DB_PATH
        }
        
        return settings;
    }

    getLocalDbConnection(rawSettings) {
        const conection = `mongodb://localhost:${rawSettings.DB_PORT}/${rawSettings.DB_NAME_DEFAULT}`;
        return conection;
    }

    getRemoteDbConnection(rawSettings) {
        const conection = `mongodb://${rawSettings.DB_LOGIN}:${rawSettings.DB_PASSWORD}@${rawSettings.DB_SHARD0}:${rawSettings.DB_PORT},${rawSettings.DB_SHARD1}:${rawSettings.DB_PORT},${rawSettings.DB_SHARD2}:${rawSettings.DB_PORT}/${rawSettings.DB_NAME_DEFAULT}?${rawSettings.DB_REPLICASET}${rawSettings.DB_ADDITIONAL}`;
        return conection;
    }

    static get Instance() {
        let result = this.instance = this.instance
            ? this.instance
            : new SettingsParser()
        return result;
    }

    getVariable(value, defaultVal = null) {
        const booleanValueTrue = "true";
        const booleanValueFalse = "false";
        let result = value && value.replace(/('|\s)/g, "") || defaultVal;
        result = result === booleanValueTrue ? true : result;
        result = result === booleanValueFalse ? false : result;
        return result;
    }
}

module.exports = SettingsParser.Instance;

