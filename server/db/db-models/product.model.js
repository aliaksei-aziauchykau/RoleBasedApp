
class Product {
    constructor() {
        this.userId = null;
        this.productName = null;
        this.productPath = null;
        this.category = null;
        this.description = null;
        this.isDeployed = null;
        this.tags = [];
    }

    static configMongoose() {
        let mongoseConfig =  {
            userId: String,
            productName: String,
            productPath: String,
            description: String,
            category: String,
            isDeployed: Boolean,
            tags: []
        }; 

        return {
            name: "Product",
            collection: "products",
            mongoseConfig
        }
    }
}

module.exports = Product;