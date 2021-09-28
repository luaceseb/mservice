const model = require('../models/maintenanceModel');
const serviceModel = require('../models/serviceModel');
const { log } = require('../lib');

exports.maintenanceListAll = async (db, req, res, next) => {
  try {
    const result = await model.maintenanceListAll(db, null);
    res.status(200).json({
      recordset: result,
      error: null,
    });
  } catch (err) {
    log.error(`[maintenance] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}

exports.maintenanceGetById = async (db, req, res, next) => {
  try {
    const resultHeader = await model.maintenanceGetById(db, req.params);
    const resultDeta = await model.maintenanceDetaGetById(db, req.params);
    const result = {
      ...resultHeader[0],
      serviceList: resultDeta
    }
    res.status(200).json({
      recordset: result,
      error: null,
    });
  } catch (err) {
    log.error(`[maintenance] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}

exports.maintenanceGetByCarId = async (db, req, res, next) => {
  try {
    const result = await model.maintenanceGetByCarId(db, req.params);
    res.status(200).json({
      recordset: result,
      error: null,
    });
  } catch (err) {
    log.error(`[maintenance] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}

exports.maintenanceCreate = async (db, req, res, next) => {
  try {
    const insertResult = await model.maintenanceCreate(db, req.body);
    const insertId = insertResult.insertId;

    let totalPay = 0
    const serviceList = req.body.serviceList

    for (const s of serviceList) {
      const serviceResult = await serviceModel.serviceGetById(db, {id: s});
      totalPay += serviceResult[0].price;
      const data = { maintenanceId: insertId, serviceId: s, price: serviceResult[0].price };
      await model.maintenanceDetaCreate(db, data);
    }

    const result = await model.maintenanceGetById(db, {id: insertId});
    res.status(201).json({
      totalPay: totalPay,
      recordset: result,
      error: null,
    });
  } catch (err) {
    log.error(`[maintenance] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}

exports.maintenanceDelete = async (db, req, res, next) => {
  try {
    const resultDeta = await model.maintenanceDetaDelete(db, req.params);
    const result = await model.maintenanceDelete(db, req.params);
    res.status(202).json({
      affectedRows: result.affectedRows,
      error: null,
    });
  } catch (err) {
    log.error(`[maintenance] ${JSON.stringify(err)}`);
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
    const dateTime = (typeof body.dateTime == 'undefined' ? null : body.dateTime);
    const carId = (typeof body.carId == 'undefined' ? null : body.carId);
    const serviceList = (typeof body.serviceList == 'undefined' ? null : body.serviceList);

    if (!dateTime) fields.push('dateTime');
    if (!carId) fields.push('carId');
    if (!serviceList) fields.push('serviceList');

    if (fields.length) {
      res.status(500).json({
        recordset: null,
        error: `[undefinedData] ${JSON.stringify(fields)}`,
      });
    } else {
      next()
    }
  } catch (err) {
    log.error(`[maintenance] ${JSON.stringify(err)}`);
    res.status(500).json({
      recordset: null,
      error: err.message,
    });
  }
}
