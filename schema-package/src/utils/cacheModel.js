const mongoose = require("mongoose");

const schemaCache = new Map();
const initializedDatabases = new Set();

const getCachedModel = async (dbName, modelName, schema) => {
  if (!schemaCache.has(dbName)) {
    schemaCache.set(dbName, new Map());
  }

  const dbCache = schemaCache.get(dbName);
  if (dbCache.has(modelName)) {
    return dbCache.get(modelName);
  }

  const conn = mongoose.connection.useDb(dbName);
  const model = conn.model(modelName, schema);
  dbCache.set(modelName, model);

  // Synchronize indexes only once per database
  await model.syncIndexes();
  return model;
};

module.exports = { getCachedModel, initializedDatabases };