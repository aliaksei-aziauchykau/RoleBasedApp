const viewModels = require("../../models/view-models/view.models");
const dbHandler = require("../../handlers/db/db.handler");
const stripeHandler = require("../../handlers/stripe/stripe.handler");
const ValueCheckerUtil = require("../../helpers/value.checker");
const HttpHelper = require("../../helpers/http.helper");
const { CannotFindInDatabaseError } = require("../../exceptions/custom.exceptions");

const getStripeAccessTokenQuery = async (stripeId) => {
    const getStripeInfoQuery = async () => dbHandler.getByIdAsync(stripeId, sc => sc.StripeDetailSchema)
    const stripeData = await getStripeInfoQuery();
    const { stripeAccessToken } = stripeData;
    if (!stripeData) throw new CannotFindInDatabaseError(`Stripe record by ${stripeId}`);
    if (!stripeAccessToken) throw new CannotFindInDatabaseError("Stripe access token");
    return stripeAccessToken;
}

const getAllAction = (params, response) => {
    const {
        stripeId,
        getViewModelFn,
        getStripeApiFn,
        stripeApiParams,
    } = params;

    const getStripeListQuery = async (stripeAccessToken) => getStripeApiFn(stripeHandler)({
        stripeAccessToken,
        ...stripeApiParams
    });
    const chain = async () => {
        const stripeAccessToken = await getStripeAccessTokenQuery(stripeId);
        const stripeListResponse = await getStripeListQuery(stripeAccessToken);

        if(!getViewModelFn) return stripeListResponse;
        const ViewModel = getViewModelFn(viewModels);
        const modelToResponse = new ViewModel(stripeListResponse);
        return modelToResponse;
    }

    HttpHelper.invokeChain(chain, response);
};


const getAction = (params, response) => {
    const {
        stripeId,
        stripeApiParams,
        getViewModelFn,
        getStripeApiFn,
    } = params;

    const stripeApiParamsCleared = ValueCheckerUtil.ClearObject(stripeApiParams);

    const getEntityStripeByIdAsync = async (stripeAccessToken) => getStripeApiFn(stripeHandler)({
        stripeAccessToken,
        ...stripeApiParamsCleared,
    });
    const chain = async () => {
        const stripeAccessToken = await getStripeAccessTokenQuery(stripeId);
        const entityStripeData = await getEntityStripeByIdAsync(stripeAccessToken);

        if(!getViewModelFn) return entityStripeData;
        const ViewModel = getViewModelFn(viewModels);
        const modelToResponse = new ViewModel(entityStripeData);
        return modelToResponse;
    }

    HttpHelper.invokeChain(chain, response);
};
const createAction = (params, response) => {

    const {
        stripeId,
        stripeApiParams,
        getStripeApiFn,
        getViewModelFn,
    } = params;

    const stripeApiParamsCleared = ValueCheckerUtil.ClearObject(stripeApiParams);

    const createEntityStripeQuery = async(stripeAccessToken) => getStripeApiFn(stripeHandler)({
        stripeAccessToken,
        ...stripeApiParamsCleared
    });
    const chain = async () => {
        const stripeAccessToken = await getStripeAccessTokenQuery(stripeId);
        const entityStripeData = await createEntityStripeQuery(stripeAccessToken);

        if(!getViewModelFn) return entityStripeData;
        const ViewModel = getViewModelFn(viewModels);
        const modelToResponse = new ViewModel(entityStripeData);
        return modelToResponse;
    }

    HttpHelper.invokeChain(chain, response);
};
const updateAction = (params, response) => {

    const {
        stripeId,
        stripeApiParams,
        getStripeApiFn,
        getViewModelFn,
    } = params;

    const stripeApiParamsCleared = ValueCheckerUtil.ClearObject(stripeApiParams);

    const updateEntityStripeQuery = async (stripeAccessToken) => getStripeApiFn(stripeHandler)({
        stripeAccessToken,
        ...stripeApiParamsCleared
    });
    const chain = async () => {
        const stripeAccessToken = await getStripeAccessTokenQuery(stripeId);
        const entityStripeData = await updateEntityStripeQuery(stripeAccessToken);

        if(!getViewModelFn) return entityStripeData;
        const ViewModel = getViewModelFn(viewModels);
        const modelToResponse = new ViewModel(entityStripeData);
        return modelToResponse;
    }

    HttpHelper.invokeChain(chain, response);
};
const deleteAction = (params, response) => {
    const {
        stripeId,
        stripeApiParams,
        getStripeApiFn,
        getViewModelFn,
    } = params;

    const removeProductStripeQuery = async (stripeAccessToken) => getStripeApiFn(stripeHandler)({
        stripeAccessToken,
        ...stripeApiParams,
    });
    const chain = async () => {
        const stripeAccessToken = await getStripeAccessTokenQuery(stripeId);
        const entityStripeData = await removeProductStripeQuery(stripeAccessToken);
        
        if(!getViewModelFn) return entityStripeData;
        const ViewModel = getViewModelFn(viewModels);
        const modelToResponse = new ViewModel(entityStripeData);
        return modelToResponse;
    }

    HttpHelper.invokeChain(chain, response);
};


module.exports = {
    getAllAction,
    getAction,
    createAction, 
    updateAction, 
    deleteAction, 
};