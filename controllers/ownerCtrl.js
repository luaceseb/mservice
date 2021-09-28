const model = require('../models/ownerModel');
const { log } = require('../lib');

exports.ownerListAll = async (db, req, res, next) => {
  try {
    const result = await model.ownerListAll(db, null);
    res.status(200).json({
      recordset: result,
      error: null,
    });
  } catch (err) {
    log.error(`[owner] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}

exports.ownerGetById = async (db, req, res, next) => {
  try {
    const result = await model.ownerGetById(db, req.params);
    res.status(200).json({
      recordset: result[0],
      error: null,
    });
  } catch (err) {
    log.error(`[owner] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}


exports.ownerCreate = async (db, req, res, next) => {
  try {
    const insertResult = await model.ownerCreate(db, req.body);
    const insertId = insertResult.insertId;
    const result = await model.ownerGetById(db, {id: insertId});
    res.status(201).json({
      recordset: result[0],
      error: null,
    });
  } catch (err) {
    log.error(`[owner] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}

exports.ownerUpdate = async (db, req, res, next) => {
  try {
    const udateResult = await model.ownerUpdate(db, req.params, req.body);
    const result = await model.ownerGetById(db, req.params);
    res.status(200).json({
      recordset: result[0],
      error: null,
    });
  } catch (err) {
    log.error(`[owner] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}

exports.ownerDelete = async (db, req, res, next) => {
  try {
    const result = await model.ownerDelete(db, req.params);
    res.status(202).json({
      affectedRows: result.affectedRows,
      error: null,
    });
  } catch (err) {
    log.error(`[owner] ${JSON.stringify(err)}`);
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
    const cuil = (typeof body.cuil == 'undefined' ? null : body.cuil);
    const firstName = (typeof body.firstName == 'undefined' ? null : body.firstName);
    const lastName = (typeof body.lastName == 'undefined' ? null : body.lastName);

    if (!cuil) fields.push('cuil');
    if (!firstName) fields.push('firstName');
    if (!lastName) fields.push('lastName');

    if (fields.length) {
      res.status(500).json({
        recordset: null,
        error: `[undefinedData] ${JSON.stringify(fields)}`,
      });
    } else {
      next()
    }
  } catch (err) {
    log.error(`[owner] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}
