var mongoose = require("mongoose");
var configProvider = require("../helpers/config.provider");
var models = require("./db-models/models");

class DatabaseBuilder {
    constructor() {
        this._schemes = {};
        this._originals= {};
        this._models = models;
    }

    get schemes() {
        return this._schemes;
    }

    get originals() {
        return this._originals;
    }

    get models() {
        return this._models;
    }

    get connection() {
        return mongoose.connection;
    }

    clearSchemes() {
        this._schemes = {};
        return this;
    }

    configureSchemes() {
        const modelKeys = Object.keys(this._models);
        for(let modelKey of modelKeys) {
            const name = `${modelKey}Schema`;
            this.configureScheme(name, this._models[modelKey].configMongoose()); 
        }
        return this;
    }

    configureScheme(name, config) {
        const {
            indexSetupFn = null
        } = config;

        const scheme = new mongoose.Schema(config.mongoseConfig, { 
            collection: config.collection, 
            versionKey: false,
            // autoIndex: false  
        });
        Object.assign(this._originals, { [name]: scheme });

        const model = mongoose.model(config.name, scheme, config.collection);
        Object.assign(this._schemes, { [name]: model });

        indexSetupFn && indexSetupFn(scheme);
        // configProvider.config.configProvider && indexSetupFn && indexSetupFn(scheme);
        return this;
    }

    connect(dbName = "") {
        
        const connection = configProvider.config.dbPath || configProvider.config.dbConnection;
        console.log(JSON.stringify(configProvider.config));
        console.log("Connection", connection);
        
        const options = {
            autoIndex: false, // Don't build indexes
            reconnectTries: 30, // Retry up to 30 times
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            useNewUrlParser: true
        }

        mongoose.connect(connection, options)
            .then(() => console.log("connection successful with db"))
            .catch(error => console.log("connection error with db", dbName, error));
    }

    static get Instance() {
        let result = this.instance = this.instance
            ? this.instance
            : new DatabaseBuilder()
        return result;
    }
}

module.exports = DatabaseBuilder.Instance