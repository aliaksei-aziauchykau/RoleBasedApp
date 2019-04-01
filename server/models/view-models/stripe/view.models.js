const productStripeViewModels = require("./product.stripe.view.model");
const planStripeViewModels = require("./plan.stripe.view.model");

module.exports = {
    ...productStripeViewModels,
    ...planStripeViewModels
};