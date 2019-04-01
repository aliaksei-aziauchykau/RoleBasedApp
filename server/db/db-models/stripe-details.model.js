
class StripeDetails {
    constructor() {
        this.userId = null;
        this.stripeAccessToken = null;
        this.stripeUserId = null;
    }

    static configMongoose() {
        const mongoseConfig =  {
            userId: String,
            stripeUserId: String,
            stripeAccessToken: String
        }; 

        return {
            name: "StripeDetails",
            collection: "stripe-details",
            mongoseConfig,
            indexSetupFn: (schema) => schema.index({ userId: "text", stripeUserId: "text" })
        }
    }
}

module.exports = StripeDetails;