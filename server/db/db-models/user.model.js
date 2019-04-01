
class User {
    constructor() {
        this.nickName = "";
        this.password = "";
        this.email = "";
    }

    static configMongoose() {
        let mongoseConfig =  {
            nickName: String,
            password: String,
            email: String,
        }; 

        return {
            name: "User",
            collection: "users",
            mongoseConfig,
            indexSetupFn: (schema) => schema.index({ nickName: "text", email: "text" })
        }
    }
}

module.exports = User;