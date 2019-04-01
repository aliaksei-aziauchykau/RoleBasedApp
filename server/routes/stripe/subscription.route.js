const express = require("express");
const router = express.Router({mergeParams: true});
const ValueCheckerUtil = require("../../helpers/value.checker");
const stripeRouteHandler = require("../../handlers/generic/stripe.route.handler");

router.get("/", (request, response) => {

    const {
        stripeId,
    } = request.params;

    const {
        billing,
        created,
        customerStripeId,
        ending_before,
        limit,
        planStripeId,
        starting_after,
        status,
    } = request.query;

    const stripeApiParams = {
        billing,
        created,
        customerStripeId,
        ending_before,
        limit,
        planStripeId,
        starting_after,
        status,
    };

    if(!ValueCheckerUtil.CheckInputParams({
        stripeId
    }, {
        stripeId
    }, response)) return;

    stripeRouteHandler.getAllAction({
        stripeId,
        getStripeApiFn: sh => sh.getAllSubscriptionsAsync,
        // getViewModelFn: vm => vm.ProductStripeListViewModel,
        stripeApiParams,
    }, response);
});

router.get("/:subscriptionStripeId", (request, response) => {

    const {
        stripeId,
        subscriptionStripeId
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams({
        stripeId
    }, {
        stripeId,
        subscriptionStripeId
    }, response)) return;

    stripeRouteHandler.getAction({
        stripeId,
        getStripeApiFn: sh => sh.getSubscriptionAsync,
        // getViewModelFn: vm => vm.ProductStripeDataViewModel,
        stripeApiParams: {
            subscriptionStripeId
        }
    }, response);
});

router.post("/", (request, response) => {

    const {
        stripeId
    } = request.params;

    const {
        planName,
        productId,
        amount,
    } = request.body;

    const sourceModel = {
        planName,
        productId,
        amount,
    };

    if(!ValueCheckerUtil.CheckInputParams({
        stripeId
    }, {
        stripeId,
        ...sourceModel
    }, response)) return;

    stripeRouteHandler.createAction({
        stripeId,
        getStripeApiFn: sh => sh.createSubscriptionAsync,
        // getViewModelFn: vm => vm.ProductStripeDataViewModel,
        stripeApiParams: {
            ...sourceModel
        }
    }, response);
   
});

router.put("/:productStripeId", (request, response) => {

    const {
        stripeId,
        productStripeId
    } = request.params;

    const {
        productName,
    } = request.body;

    const sourceModel = {
        productName,
        productStripeId
    };

    if(!ValueCheckerUtil.CheckInputParams({
        stripeId
    }, {
        productStripeId,
        stripeId,
        productName
    }, response)) return;

    stripeRouteHandler.updateAction({
        stripeId,
        getStripeApiFn: sh => sh.updateProductAsync,
        getViewModelFn: vm => vm.ProductStripeDataViewModel,
        stripeApiParams: {
            ...sourceModel
        }
    });
});

router.delete("/:productStripeId", (request, response) => {

    const {
        stripeId,
        productStripeId
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams({
        stripeId
    }, {
        stripeId,
        productStripeId,
    }, response)) return;

    stripeRouteHandler.deleteAction({
        stripeId,
        getStripeApiFn: sh => sh.deleteProductAsync,
        stripeApiParams: {
            productStripeId
        }
    });
});

module.exports = router;