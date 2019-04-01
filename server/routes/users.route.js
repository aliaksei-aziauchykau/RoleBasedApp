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
        getSchemaFn: sc => sc.UserSchema,
        getViewModelFn: vm => vm.UserInfoListViewModel,
        queryParams
    }, response);
});

router.get("/:userId", (request, response) => {

    const {
        userId
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams(response, {
        userId
    }, {
    })) return;

    routeHandler.getAction({
        id: userId,
        getSchemaFn: sc => sc.UserSchema,
        getViewModelFn: vm => vm.UserInfoDataViewModel
    }, response);
});

router.post("/", (request, response) => {

    const {
        nickName,
        email,
    } = request.body;

    const sourceModel = ValueCheckerUtil.ClearObject({
        nickName,
        email,
    });

    if(!ValueCheckerUtil.CheckInputParams(response, {
    }, {
        ...sourceModel
    })) return;

    routeHandler.createAction({
        sourceModel,
        getSchemaFn: sc => sc.UserSchema,
        getDbModelFn: db => db.User,
        getViewModelFn: vm => vm.UserInfoDataViewModel,
    }, response);
});

router.put("/:userId", (request, response) => {

    const {
        userId
    } = request.params;

    const {
        nickName,
        email,
    } = request.body;

    const sourceModel = ValueCheckerUtil.ClearObject({
        nickName,
        email,
    });

    if(!ValueCheckerUtil.CheckInputParams(response, {
        userId
    }, {
    })) return;

    routeHandler.updateAction({
        id: userId,
        sourceModel,
        getSchemaFn: sc => sc.UserSchema,
        getViewModelFn: vm => vm.UserInfoDataViewModel,
    }, response);
});

router.delete("/:userId", (request, response) => {

    const {
        userId
    } = request.params;

    if(!ValueCheckerUtil.CheckInputParams(response, {
        userId
    }, {
    })) return;

    routeHandler.deleteAction({
        id: userId,
        getSchemaFn: sc => sc.UserSchema,
    }, response);
});


module.exports = router;