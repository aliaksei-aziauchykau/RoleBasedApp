const express = require("express");
const router = express.Router();
const ValueCheckerUtil = require("../helpers/value.checker");
const routeHandler = require("../handlers/generic/route.handler");

router.get("/", (request, response) => {

    const {
        limit,
        skip,
        sort,
        order,
        query,
        helpQueryParams,
    } = request.query;

    if(!ValueCheckerUtil.CheckInputParams(response, {
    }, {
    }, {
        limit,
        skip,
        sort,
        order,
        query,
        helpQueryParams
    })) return;

    const queryParams = ValueCheckerUtil.ClearObject({
        limit,
        skip,
        sort,
        order,
        query,
    });

    routeHandler.getAllAction({
        getSchemaFn: sc => sc.ProductSchema,
        getViewModelFn: vm => vm.ProductViewModel,
        queryParams
    }, response);
});

router.get("/:productId", (request, response) => {

    const {
        productId
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams(response, {
        productId
    }, {
    })) return;

    routeHandler.getAction({
        id: productId,
        getSchemaFn: sc => sc.ProductSchema,
        getViewModelFn: vm => vm.ProductViewModel
    }, response);
});

router.post("/", (request, response) => {

    const {
        userId,
        productName,
        productPath,
        description,
        category,
        isDeployed = false,
        tags,
    } = request.body;

    const sourceModel = ValueCheckerUtil.ClearObject({
        userId,
        productName,
        productPath,
        description,
        category,
        isDeployed,
        tags,
    });

    if(!ValueCheckerUtil.CheckInputParams(response, {
        userId
    }, {
        ...sourceModel
    })) return;

    routeHandler.createAction({
        sourceModel,
        getSchemaFn: sc => sc.ProductSchema,
        getDbModelFn: db => db.Product,
        getViewModelFn: vm => vm.ProductViewModel,
        checkModel: {
            id: userId,
            getSchemaFn: sc => sc.UserSchema
        }
    }, response);
});

router.put("/:productId", (request, response) => {

    const {
        productId
    } = request.params;

    const {
        productName,
        productPath,
        description,
        category,
        isDeployed = false,
        tags,
    } = request.body;

    const sourceModel = ValueCheckerUtil.ClearObject({
        productName,
        productPath,
        description,
        category,
        isDeployed,
        tags,
    });


    if(!ValueCheckerUtil.CheckInputParams(response, {
        productId
    }, {
    })) return;

    routeHandler.updateAction({
        id: productId,
        sourceModel,
        getSchemaFn: sc => sc.ProductSchema,
        getViewModelFn: vm => vm.ProductViewModel,
    }, response);
});

router.delete("/:productId", (request, response) => {

    const {
        productId
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams(response, {
        productId
    }, {
    })) return;

    routeHandler.deleteAction({
        id: productId,
        getSchemaFn: sc => sc.ProductSchema,
    }, response);
});


module.exports = router;