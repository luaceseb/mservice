  //List ***********************************************************************
  exports.serviceListAll = (db, params) => {
    return db.query('SELECT * FROM service');
  }

  //GetById ***********************************************************************
  exports.serviceGetById = (db, params) => {
    var parameters = [];
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('SELECT * FROM service WHERE serviceId = ?', parameters);
  }

  //serviceCreate ***********************************************************************
  exports.serviceCreate = (db, body) => {
    var parameters = [];
    parameters.push( (typeof body.name == 'undefined' ? null : body.name) );
    parameters.push( (typeof body.price == 'undefined' ? null : body.price) );
    return db.query('INSERT INTO service (name, price) values (?, ?)', parameters);
  }

  //serviceUpdate ***********************************************************************
  exports.serviceUpdate = (db, params, body) => {
    var parameters = [];
    parameters.push( (typeof body.name == 'undefined' ? null : body.name) );
    parameters.push( (typeof body.price == 'undefined' ? null : body.price) );
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('UPDATE service SET name = ?, price = ? WHERE serviceId = ?;', parameters);
  }

    //serviceDelete ***********************************************************************
  exports.serviceDelete = (db, params) => {
    var parameters = [];
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('DELETE FROM service WHERE serviceId = ?', parameters);
  }
