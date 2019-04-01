
class Post {
    constructor() {
        this.productId = null;
        this.title = null;
        this.message = null;
        this.planTypes = [];
    }

    static configMongoose() {
        let mongoseConfig =  {
            productId: String,
            title: String,
            message: String,
            planTypes: [{
                name: String
            }]
        }; 

        return {
            name: "Post",
            collection: "posts",
            mongoseConfig
        }
    }
}

module.exports = Post;