
const database = require("../../db/database");
const executor = require("../../helpers/excecutor");
const ValueCheckerUtil = require("../../helpers/value.checker");
const configProvider = require("../../helpers/config.provider");

const getListCountAsync = async (queryParams, getSchemaFun) => {
    queryParams = queryParams || {};
    const {
        query,
    } = queryParams;

    const querySearch = ValueCheckerUtil.isValid(query) ? 
        { $text: { $search: query } } : {}

    const Schema = getSchemaFun(database.schemes);
    
    const result = await Schema.count(querySearch).exec();
    return result;
};

const getListByQueryAsync =  async (queryParams, getSchemaFun) => {
    queryParams = queryParams || {};
    const {
        limit = 0,
        skip = 0,
        order,
        sort,
        query,
    } = queryParams;

    const querySearch = ValueCheckerUtil.isValid(query) ? 
        { $text: { $search: query } } : {};

    const sortQuery = ValueCheckerUtil.isValidArguments([sort, order]) ?
        { [sort]: order } : {};

    const Schema = getSchemaFun(database.schemes);

    // Can be removed

    // if()
    await Schema.createIndexes();
    const result = await Schema
        .find(querySearch)
        .limit(Number(limit))
        .skip(Number(skip))
        .sort(sortQuery)
        .exec();
    return result;
};

const getByQueryAsync = async (query, getSchemaFun) => {

    const Schema = getSchemaFun(database.schemes);
    const result = await Schema.findOne(query).exec();
    return result;
};

const getByIdAsync = async (id, getSchemaFun) => {
    const Schema = getSchemaFun(database.schemes);
    const result = await Schema.findById(id).exec();
    return result;
};

const createModelAsync = async (data, getSchemaFn) => {
    const Schema = getSchemaFn(database.schemes);
    const result = await new Schema(data).save();
    return result;
}


const updateByIdAsync = async (id, updateData, getSchemaFn) => {
    const Schema = getSchemaFn(database.schemes);
    const result = await Schema.updateOne({_id: id }, { $set: updateData }, { upsert: true }).exec();
    return result;
}

const updateByIdRawAsync = async (id, updateData, getSchemaFn) => {
    const Schema = getSchemaFn(database.schemes);
    const result = await Schema.updateOne({_id: id }, updateData, { upsert: true }).exec();
    return result;
}

const updateByQueryAsync = async (query, updateData, getSchemaFn) => {
    const Schema = getSchemaFn(database.schemes);
    const result = await Schema.update(query, { $set: updateData }, { upsert: true, new: true }).exec();
    return result;
}

const updateByQueryRawAsync = async (query, updateData, getSchemaFn) => {
    const Schema = getSchemaFn(database.schemes);
    const result = await Schema.update(query, updateData, { upsert: true, new: true }).exec();
    return result;
}

const removeByIdAsync = async (id, getSchemaFn) => {
    const Schema = getSchemaFn(database.schemes);
    const result = await Schema.deleteOne({ _id: id }).exec();
    return result;
}

const removeByQueryRawAsync = async (query, getSchemaFn) => {
    const Schema = getSchemaFn(database.schemes);
    const result = await Schema.deleteOne(query).exec();
    return result;
}

const aggregateAsync = async (query, getSchemaFun) => {
    const Schema = getSchemaFun(database.schemes);
    const result = await Schema.aggregate(query).exec();
    return result;
}

module.exports = {

    getByIdAsync: executor.logDecorator(getByIdAsync, getByIdAsync.name),
    getByQueryAsync: executor.logDecorator(getByQueryAsync, getByQueryAsync.name),
    getListByQueryAsync: executor.logDecorator(getListByQueryAsync, getListByQueryAsync.name),
    getListCountAsync: executor.logDecorator(getListCountAsync, getListCountAsync.name),

    createModelAsync: executor.logDecorator(createModelAsync, createModelAsync.name),

    updateByIdAsync: executor.logDecorator(updateByIdAsync, updateByIdAsync.name),
    updateByIdRawAsync: executor.logDecorator(updateByIdRawAsync, updateByIdRawAsync.name),
    updateByQueryAsync: executor.logDecorator(updateByQueryAsync, updateByQueryAsync.name),
    updateByQueryRawAsync: executor.logDecorator(updateByQueryRawAsync, updateByQueryRawAsync.name),

    removeByIdAsync: executor.logDecorator(removeByIdAsync, removeByIdAsync.name),
    removeByQueryRawAsync: executor.logDecorator(removeByQueryRawAsync, removeByQueryRawAsync.name),

    aggregateAsync: executor.logDecorator(aggregateAsync, aggregateAsync.name)
}
