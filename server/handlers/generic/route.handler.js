const dbModels = require("../../db/db-models/models");
const viewModels = require("../../models/view-models/view.models");
const dbHandler = require("../db/db.handler");
const mapper = require("../../helpers/mapper");
const executor = require("../../helpers/excecutor");
const { CannotFindInDatabaseError } = require("../../exceptions/custom.exceptions");
const HttpHelper = require("../../helpers/http.helper");

const getAllAction = (params, response) => {
    const {
        getSchemaFn,
        getViewModelFn,
        queryParams,
    } = params;

    const getListQuery = async () => dbHandler.getListByQueryAsync(queryParams, getSchemaFn);
    const getListCount = async () => dbHandler.getListCountAsync(queryParams, getSchemaFn);
    const chain = async () => {
        const list = await getListQuery();
        const count = await getListCount();
        const ViewModel = getViewModelFn(viewModels);
        const modelToResponse = new ViewModel({
            items: list,
            count
        });
        return modelToResponse;
    }

    HttpHelper.invokeChain(chain, response);
};
const getAction = (params, response) => {
    const {
        id,
        getSchemaFn,
        getViewModelFn,
    } = params;

    const checkEntityByIdQuery = async () => dbHandler.getByIdAsync(id, getSchemaFn);
    const chain = async () => {
        const entityData = await checkEntityByIdQuery();
        if (!entityData) throw new CannotFindInDatabaseError(`[Id]: ${entityData}`);

        const ViewModel = getViewModelFn(viewModels);
        const modelToResponse = mapper.mapProperties(entityData, new ViewModel());
        return modelToResponse;
    }

    HttpHelper.invokeChain(chain, response);
};
const createAction = (params, response) => {

    const {
        sourceModel,
        getSchemaFn,
        getDbModelFn,
        getViewModelFn,
        checkModel,
    } = params;

    const DbModel = getDbModelFn(dbModels);
    const modelToSave = mapper.mapProperties(sourceModel, new DbModel());

    const checkByIdQuery = async (checkModelParam) => dbHandler.getByIdAsync(checkModelParam.id, checkModelParam.getSchemaFn);
    const createModelAsync = async () => dbHandler.createModelAsync(modelToSave, getSchemaFn);
    const chain = async () => {
        if (checkModel) {
            const entityData = await checkByIdQuery(checkModel);
            if (!entityData) throw new CannotFindInDatabaseError(`[Id]: ${checkModel.id}`);
        }

        const result = await createModelAsync();

        const ViewModel = getViewModelFn(viewModels);
        const modelToResponse = mapper.mapProperties(result, new ViewModel());
        return modelToResponse;
    }

    HttpHelper.invokeChain(chain, response);
};
const updateAction = (params, response) => {
    const {
        id,
        sourceModel,
        getSchemaFn,
        getViewModelFn,
    } = params;

    const getByIdQuery = async () => dbHandler.getByIdAsync(id, getSchemaFn);
    const updateByIdQuery = async () => dbHandler.updateByIdAsync(id, sourceModel, getSchemaFn);
    const chain = async () => {
        const entityData = await getByIdQuery();
        if (!entityData) throw new CannotFindInDatabaseError(`[id]: ${id}`);

        await updateByIdQuery();
        const result = await getByIdQuery();

        const ViewModel = getViewModelFn(viewModels);
        const modelToResponse = mapper.mapProperties(result, new ViewModel());
        return modelToResponse;
    }

    HttpHelper.invokeChain(chain, response);
};
const deleteAction = (params, response) => {
    const {
        id,
        getSchemaFn,
    } = params;

    // Cascade. 
    const getByIdQuery = async () => dbHandler.getByIdAsync(id, getSchemaFn);
    const removeByIdQuery = async () => dbHandler.removeByIdAsync(id, getSchemaFn);
    const chain = async () => {
        const entityData = await getByIdQuery();
        if (!entityData) throw new CannotFindInDatabaseError(`[Id]: ${id}`);

        await removeByIdQuery();
    }
    
    HttpHelper.invokeChain(chain, response);
};

module.exports = {
    getAllAction,
    getAction,
    createAction, 
    updateAction, 
    deleteAction, 
}