const express = require("express");
const router = express.Router();
const ValueCheckerUtil = require("../helpers/value.checker");
const routeHandler = require("../handlers/generic/route.handler");

router.get("/", (request, response) => {

    routeHandler.getAllAction({
        getSchemaFn: sc => sc.PostSchema,
        getViewModelFn: vm => vm.PostViewModel
    }, response);
});

router.get("/:postId", (request, response) => {

    const {
        postId
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams(response, {
        postId
    }, {
    })) return;

    routeHandler.getAction({
        id: postId,
        getSchemaFn: sc => sc.PostSchema,
        getViewModelFn: vm => vm.PostViewModel
    }, response);
});

router.post("/", (request, response) => {

    const {
        productId,
        title,
        message,
        planTypes,
    } = request.body;

    const sourceModel = ValueCheckerUtil.ClearObject({
        productId,
        title,
        message,
        planTypes
    });

    if(!ValueCheckerUtil.CheckInputParams(response, {
        productId
    }, {
        ...sourceModel
    })) return;

    routeHandler.createAction({
        sourceModel,
        getSchemaFn: sc => sc.PostSchema,
        getDbModelFn: db => db.Post,
        getViewModelFn: vm => vm.PostViewModel,
        checkModel: {
            id: productId,
            getSchemaFn: sc => sc.ProductSchema
        }
    }, response);
});

router.put("/:postId", (request, response) => {

    const {
        postId
    } = request.params;

    const {
        title,
        message,
        planTypes,
    } = request.body;

    const sourceModel = ValueCheckerUtil.ClearObject({
        title, 
        message, 
        planTypes
    });

    if(!ValueCheckerUtil.CheckInputParams(response, {
        postId
    }, {
    })) return;

    routeHandler.updateAction({
        id: postId,
        sourceModel,
        getSchemaFn: sc => sc.PostSchema,
        getViewModelFn: vm => vm.PostViewModel,
    }, response);
});

router.delete("/:postId", (request, response) => {

    const {
        postId
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams(response, {
        postId
    }, {
    })) return;

    routeHandler.deleteAction({
        id: postId,
        getSchemaFn: sc => sc.PostSchema,
    }, response);
});

module.exports = router;