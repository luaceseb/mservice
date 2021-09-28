  //List ***********************************************************************
  exports.carListAll = (db, params) => {
    return db.query('SELECT c.*, o.firstName, o.lastName, o.cuil ' +
                    'FROM car AS c ' + 
                    'LEFT JOIN owner AS o ON o.ownerId = c.ownerId');
  }

  //GetById ***********************************************************************
  exports.carGetById = (db, params) => {
    var parameters = [];
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('SELECT c.*, o.firstName, o.lastName, o.cuil ' +
                    'FROM car AS c ' + 
                    'LEFT JOIN owner AS o ON o.ownerId = c.ownerId ' + 
                    'WHERE c.carId = ?', parameters);
  }

  //GetByOwnerId ***********************************************************************
  exports.carGetByOwnerId = (db, params) => {
    var parameters = [];
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('SELECT c.*, o.firstName, o.lastName, o.cuil ' +
                    'FROM car AS c ' + 
                    'JOIN owner AS o ON o.ownerId = c.ownerId ' +  
                    'WHERE c.ownerId = ?', parameters);
  }

  //carCreate ***********************************************************************
  exports.carCreate = (db, body) => {
    var parameters = [];
    parameters.push( (typeof body.licensePlate == 'undefined' ? null : body.licensePlate) );
    parameters.push( (typeof body.brandId == 'undefined' ? null : body.brandId) );
    parameters.push( (typeof body.modelId == 'undefined' ? null : body.modelId) );
    parameters.push( (typeof body.year == 'undefined' ? null : body.year) );
    parameters.push( (typeof body.colorId == 'undefined' ? null : body.colorId) );
    parameters.push( (typeof body.ownerId == 'undefined' ? null : body.ownerId) );

    return db.query('INSERT INTO car (licensePlate, brandId, modelId, year, colorId, ownerId) values (?, ?, ?, ?, ?, ?)', parameters);
  }

  //carUpdate ***********************************************************************
  exports.carUpdate = (db, params, body) => {
    var parameters = [];
    parameters.push( (typeof body.licensePlate == 'undefined' ? null : body.licensePlate) );
    parameters.push( (typeof body.brandId == 'undefined' ? null : body.brandId) );
    parameters.push( (typeof body.modelId == 'undefined' ? null : body.modelId) );
    parameters.push( (typeof body.year == 'undefined' ? null : body.year) );
    parameters.push( (typeof body.colorId == 'undefined' ? null : body.colorId) );
    parameters.push( (typeof body.ownerId == 'undefined' ? null : body.ownerId) );
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('UPDATE car SET licensePlate = ?, brandId = ?, modelId = ?, year = ?, colorId = ?, ownerId = ? WHERE carId = ?;', parameters);
  }

    //carDelete **********************************************************************
  exports.carDelete = (db, params) => {
    var parameters = [];
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('DELETE FROM car WHERE carId = ?', parameters);
  }
