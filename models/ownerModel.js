  //List ***********************************************************************
  exports.ownerListAll = (db, params) => {
    return db.query('SELECT * FROM owner');
  }

  //GetById ***********************************************************************
  exports.ownerGetById = (db, params) => {
    var parameters = [];
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('SELECT * FROM owner WHERE ownerId = ?', parameters);
  }


  //ownerCreate ***********************************************************************
  exports.ownerCreate = (db, body) => {
    var parameters = [];
    parameters.push( (typeof body.cuil == 'undefined' ? null : body.cuil) );
    parameters.push( (typeof body.firstName == 'undefined' ? null : body.firstName) );
    parameters.push( (typeof body.lastName == 'undefined' ? null : body.lastName) );

    return db.query('INSERT INTO owner (cuil, firstName, lastName) values (?, ?, ?)', parameters);
  }

  //ownerUpdate ***********************************************************************
  exports.ownerUpdate = (db, params, body) => {
    var parameters = [];
    parameters.push( (typeof body.cuil == 'undefined' ? null : body.cuil) );
    parameters.push( (typeof body.firstName == 'undefined' ? null : body.firstName) );
    parameters.push( (typeof body.lastName == 'undefined' ? null : body.lastName) );
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('UPDATE owner SET cuil = ?, firstName = ?, lastName = ? WHERE ownerId = ?;', parameters);
  }

    //ownerDelete **********************************************************************
  exports.ownerDelete = (db, params) => {
    var parameters = [];
    parameters.push( (typeof params.id == 'undefined' ? null : params.id) );
    return db.query('DELETE FROM owner WHERE ownerId = ?', parameters);
  }
