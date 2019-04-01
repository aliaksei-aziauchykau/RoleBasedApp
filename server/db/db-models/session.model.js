
class Session {
    constructor() {
        this.session = null;
        this.expires = "";
    }

    static configMongoose() {
        let mongoseConfig =  {
            session: {},
            expires: Date
        };

        return {
            name: "Session",
            collection: "sessions",
            mongoseConfig
        }
    }
}

module.exports = Session;