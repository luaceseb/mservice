const model = require('../models/carModel');
const { errorResponse } = require('../lib');

exports.carListAll = async (db, reqUUID, req, res, next) => {
  try {
    const result = await model.carListAll(db, null);
    res.status(200).json({
      recordset: result,
      error: null,
    });
  } catch (err) {
    errorResponse(res, 'owner', reqUUID, err);
  }
}

exports.carGetById = async (db, reqUUID, req, res, next) => {
  try {
    const result = await model.carGetById(db, req.params);
    res.status(200).json({
      recordset: result[0],
      error: null,
    });
  } catch (err) {
    errorResponse(res, 'owner', reqUUID, err);
  }
}

exports.carGetByOwnerId = async (db, reqUUID, req, res, next) => {
  try {
    const result = await model.carGetByOwnerId(db, req.params);
    res.status(200).json({
      recordset: result,
      error: null,
    });
  } catch (err) {
    errorResponse(res, 'owner', reqUUID, err);
  }
}

exports.carCreate = async (db, reqUUID, req, res, next) => {
  try {
    const insertResult = await model.carCreate(db, req.body);
    const insertId = insertResult.insertId;
    const result = await model.carGetById(db, {id: insertId});
    res.status(201).json({
      recordset: result[0],
      error: null,
    });
  } catch (err) {
    errorResponse(res, 'owner', reqUUID, err);
  }
}

exports.carUpdate = async (db, reqUUID, req, res, next) => {
  try {
    const udateResult = await model.carUpdate(db, req.params, req.body);
    const result = await model.carGetById(db, req.params);
    res.status(200).json({
      recordset: result[0],
      error: null,
    });
  } catch (err) {
    errorResponse(res, 'owner', reqUUID, err);
  }
}

exports.carDelete = async (db, reqUUID, req, res, next) => {
  try {
    const result = await model.carDelete(db, req.params);
    res.status(202).json({
      affectedRows: result.affectedRows,
      error: null,
    });
  } catch (err) {
    errorResponse(res, 'owner', reqUUID, err);
  }
}

exports.validData = async (db, reqUUID, req, res, next) => {
  try {
    const fields = [];
    const body = req.body;
    const licensePlate = (typeof body.licensePlate == 'undefined' ? null : body.licensePlate);
    const brandId = (typeof body.brandId == 'undefined' ? null : body.brandId);
    const modelId = (typeof body.modelId == 'undefined' ? null : body.modelId);
    const year = (typeof body.year == 'undefined' ? null : body.year);
    const colorId = (typeof body.colorId == 'undefined' ? null : body.colorId);

    if (!licensePlate) fields.push('licensePlate');
    if (!brandId) fields.push('brandId');
    if (!modelId) fields.push('modelId');
    if (!year) fields.push('year');
    if (!colorId) fields.push('colorId');

    if (fields.length) {
      res.status(500).json({
        recordset: null,
        error: `[undefinedData] ${JSON.stringify(fields)}`,
      });
    } else {
      next()
    }
  } catch (err) {
    errorResponse(res, 'owner', reqUUID, err);
  }
}
