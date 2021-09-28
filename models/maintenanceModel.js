  //List ***********************************************************************
  exports.maintenanceListAll = (db, params) => {
    return db.query('SELECT m.*, s.name, d.price, c.licensePlate, o.cuil, o.firstName, o.lastName ' + 
                    'FROM maintenance AS m ' + 
                    'JOIN maintenanceDeta AS d ON d.maintenanceId = m.maintenanceId ' + 
                    'JOIN service AS s ON s.serviceId = d.serviceId ' + 
                    'JOIN car AS c ON c.carId = m.carId ' + 
                    'LEFT JOIN owner AS o ON o.ownerId = c.ownerId ');
  }

  //GetById ***********************************************************************
  exports.maintenanceGetById = (db, params) => {
    var parameters = [];
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('SELECT m.*, c.licensePlate, o.cuil, o.firstName, o.lastName ' + 
                    'FROM maintenance AS m ' + 
                    'JOIN car AS c ON c.carId = m.carId ' + 
                    'LEFT JOIN owner AS o ON o.ownerId = c.ownerId ' + 
                    'WHERE m.maintenanceId = ?', parameters);
  }

  //GetById ***********************************************************************
  exports.maintenanceDetaGetById = (db, params) => {
    var parameters = [];
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('SELECT d.*, s.name ' + 
                    'FROM maintenanceDeta AS d ' + 
                    'JOIN service AS s ON s.serviceId = d.serviceId ' + 
                    'WHERE d.maintenanceId = ?', parameters);
  }

  //GetByCarId ***********************************************************************
  exports.maintenanceGetByCarId = (db, params) => {
    var parameters = [];
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('SELECT m.*, s.name, d.price, c.licensePlate, o.cuil, o.firstName, o.lastName ' + 
                    'FROM maintenance AS m ' + 
                    'JOIN maintenanceDeta AS d ON d.maintenanceId = m.maintenanceId ' + 
                    'JOIN service AS s ON s.serviceId = d.serviceId ' + 
                    'JOIN car AS c ON c.carId = m.carId ' + 
                    'LEFT JOIN owner AS o ON o.ownerId = c.ownerId ' + 
                    'WHERE m.carId = ?', parameters);
  }

  //maintenanceCreate ***********************************************************************
  exports.maintenanceCreate = (db, body) => {
    var parameters = [];
    parameters.push( (typeof body.dateTime == 'undefined' ? null : body.dateTime) );
    parameters.push( (typeof body.carId == 'undefined' ? null : body.carId) );

    return db.query('INSERT INTO maintenance (dateTime, carId) values (?, ?)', parameters);
  }

  //maintenanceDetaCreate ***********************************************************************
  exports.maintenanceDetaCreate = (db, body) => {
    var parameters = [];
    parameters.push( (typeof body.maintenanceId == 'undefined' ? null : body.maintenanceId) );
    parameters.push( (typeof body.serviceId == 'undefined' ? null : body.serviceId) );
    parameters.push( (typeof body.price == 'undefined' ? null : body.price) );

    return db.query('INSERT INTO maintenanceDeta (maintenanceId, serviceId, price) values (?, ?, ?)', parameters);
  }

  //maintenanceDelete **********************************************************************
  exports.maintenanceDelete = (db, params) => {
    var parameters = [];
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('DELETE FROM maintenance WHERE maintenanceId = ?', parameters);
  }

  //maintenanceDetaDelete **********************************************************************
  exports.maintenanceDetaDelete = (db, params) => {
    var parameters = [];
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('DELETE FROM maintenanceDeta WHERE maintenanceId = ?', parameters);
  }