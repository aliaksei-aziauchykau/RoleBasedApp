class ConfigProvider {

    get config() {
        return this._config;
    }

    store(config) {
        this._config = config;
    }

    static get Instance() {
        let result = this.instance = this.instance
            ? this.instance
            : new ConfigProvider()
        return result;
    }
}


module.exports = ConfigProvider.Instance