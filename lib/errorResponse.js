const log = require('./log');

function errorResponse(res, tag, reqUUID, err) {
  log.error(`[${tag}] [${reqUUID}] ${JSON.stringify(err)}`);
  res.status(500).json({
    recordset: null,
    error: err.message,
  });
}

module.exports = errorResponse;