const model = require('../models/serviceModel');
const { log } = require('../lib');

exports.serviceListAll = async (db, req, res, next) => {
  try {
    const result = await model.serviceListAll(db, null);
    res.status(200).json({
      recordset: result,
      error: null,
    });
  } catch (err) {
    log.error(`[service] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}

exports.serviceGetById = async (db, req, res, next) => {
  try {
    const result = await model.serviceGetById(db, req.params);
    res.status(200).json({
      recordset: result[0],
      error: null,
    });
  } catch (err) {
    log.error(`[service] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}

exports.serviceCreate = async (db, req, res, next) => {
  try {
    const insertResult = await model.serviceCreate(db, req.body);
    const insertId = insertResult.insertId;
    const result = await model.serviceGetById(db, {id: insertId});
    res.status(201).json({
      recordset: result[0],
      error: null,
    });
  } catch (err) {
    log.error(`[service] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}

exports.serviceUpdate = async (db, req, res, next) => {
  try {
    const udateResult = await model.serviceUpdate(db, req.params, req.body);
    const result = await model.serviceGetById(db, req.params);
    res.status(200).json({
      recordset: result[0],
      error: null,
    });
  } catch (err) {
    log.error(`[service] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}

exports.serviceDelete = async (db, req, res, next) => {
  try {
    const result = await model.serviceDelete(db, req.params);
    res.status(202).json({
      affectedRows: result.affectedRows,
      error: null,
    });
  } catch (err) {
    log.error(`[service] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}

exports.validData = async (db, req, res, next) => {
  try {
    const fields = [];
    const body = req.body;
    const name = (typeof body.name == 'undefined' ? null : body.name);
    const price = (typeof body.price == 'undefined' ? null : body.price);

    if (!name) fields.push('name');
    if (!price) fields.push('price');

    if (fields.length) {
      res.status(500).json({
        recordset: null,
        error: `[undefinedData] ${JSON.stringify(fields)}`,
      });
    } else {
      next()
    }
  } catch (err) {
    log.error(`[service] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}
