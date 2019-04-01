const ProductViewModel = require("./product.view.model");
const PostViewModel = require("./post.view.model");
const userViewModels = require("./user.view.models");
const stripeViewModels = require("./stripe.view.models");

module.exports = {
    PostViewModel,
    ProductViewModel,
    ...userViewModels,
    ...stripeViewModels
}