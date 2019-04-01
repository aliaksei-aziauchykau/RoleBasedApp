const express = require("express");
const router = express.Router({mergeParams: true});
const ValueCheckerUtil = require("../../helpers/value.checker");
const stripeRouteHandler = require("../../handlers/generic/stripe.route.handler");

router.get("/", (request, response) => {

    const {
        stripeId,
    } = request.params;

    const {
        active,
        created,
        limit,
        product,
        helpQueryParams,
    } = request.query;

    const stripeApiParams = {
        active,
        created,
        limit,
        product,
    };

    if(!ValueCheckerUtil.CheckInputParams(response, {
        stripeId
    }, {
        stripeId
    }, {
        active,
        created,
        limit,
        product,
        helpQueryParams
    })) return;

    stripeRouteHandler.getAllAction({
        stripeId,
        getStripeApiFn: sh => sh.getAllPlansAsync,
        getViewModelFn: vm => vm.PlanStripeListViewModel,
        stripeApiParams,
    }, response);
});

router.get("/:planStripeId", (request, response) => {

    const {
        stripeId,
        planStripeId
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams(response, {
        stripeId
    }, {
        stripeId,
        planStripeId
    })) return;

    stripeRouteHandler.getAction({
        stripeId,
        getStripeApiFn: sh => sh.getPlanAsync,
        getViewModelFn: vm => vm.PlanStripeDataViewModel,
        stripeApiParams: {
            planStripeId
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

    if(!ValueCheckerUtil.CheckInputParams(response, {
        stripeId
    }, {
        stripeId,
        ...sourceModel
    })) return;

    stripeRouteHandler.createAction({
        stripeId,
        getStripeApiFn: sh => sh.createPlanAsync,
        getViewModelFn: vm => vm.PlanStripeDataViewModel,
        stripeApiParams: {
            ...sourceModel
        }
    }, response);
   
});

router.put("/:planStripeId", (request, response) => {

    const {
        stripeId,
        planStripeId
    } = request.params;

    const {
        planName
    } = request.body;

    const sourceModel = {
        planStripeId,
        planName
    };

    if(!ValueCheckerUtil.CheckInputParams(response, {
        stripeId
    }, {
        stripeId,
        ...sourceModel
    })) return;

    stripeRouteHandler.updateAction({
        stripeId,
        getStripeApiFn: sh => sh.updatePlanAsync,
        getViewModelFn: vm => vm.PlanStripeDataViewModel,
        stripeApiParams: {
            ...sourceModel
        }
    }, response);
});

router.delete("/:planStripeId", (request, response) => {

    const {
        stripeId,
        planStripeId
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams(response, {
        stripeId
    }, {
        stripeId,
        planStripeId,
    })) return;

    stripeRouteHandler.deleteAction({
        stripeId,
        getStripeApiFn: sh => sh.deletePlanAsync,
        stripeApiParams: {
            planStripeId
        }
    }, response);
});

module.exports = router;