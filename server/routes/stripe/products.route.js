const express = require("express");
const router = express.Router({mergeParams: true});
const ValueCheckerUtil = require("../../helpers/value.checker");
const stripeRouteHandler = require("../../handlers/generic/stripe.route.handler");

router.get("/", (request, response) => {

    const {
        stripeId,
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams(response, {
        stripeId
    }, {
        stripeId
    })) return;

    stripeRouteHandler.getAllAction({
        stripeId,
        getStripeApiFn: sh => sh.getAllProductsAsync,
        getViewModelFn: vm => vm.ProductStripeListViewModel,
    }, response);
});

router.get("/:productStripeId", (request, response) => {

    const {
        stripeId,
        productStripeId
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams(response, {
        stripeId
    }, {
        stripeId,
        productStripeId
    })) return;

    stripeRouteHandler.getAction({
        stripeId,
        getStripeApiFn: sh => sh.getProductAsync,
        getViewModelFn: vm => vm.ProductStripeDataViewModel,
        stripeApiParams: {
            productStripeId
        }
    }, response);
});

router.post("/", (request, response) => {

    const {
        stripeId
    } = request.params;

    const {
        productName,
        type,
    } = request.body;

    const sourceModel = {
        productName,
        type
    };

    if(!ValueCheckerUtil.CheckInputParams(response, {
        stripeId
    }, {
        stripeId,
        productName
    })) return;

    stripeRouteHandler.createAction({
        stripeId,
        getStripeApiFn: sh => sh.createProductAsync,
        getViewModelFn: vm => vm.ProductStripeDataViewModel,
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

    if(!ValueCheckerUtil.CheckInputParams(response, {
        stripeId
    }, {
        productStripeId,
        stripeId,
        productName
    })) return;

    stripeRouteHandler.updateAction({
        stripeId,
        getStripeApiFn: sh => sh.updateProductAsync,
        getViewModelFn: vm => vm.ProductStripeDataViewModel,
        stripeApiParams: {
            ...sourceModel
        }
    }, response);
});

router.delete("/:productStripeId", (request, response) => {

    const {
        stripeId,
        productStripeId
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams(response, {
        stripeId
    }, {
        stripeId,
        productStripeId,
    })) return;

    stripeRouteHandler.deleteAction({
        stripeId,
        getStripeApiFn: sh => sh.deleteProductAsync,
        stripeApiParams: {
            productStripeId
        }
    }, response);
});

module.exports = router;