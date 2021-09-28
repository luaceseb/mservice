var maintenanceModel = require('../../models/maintenanceModel');
var request = require('request');
var server = require('../../bin/www');

var base_url = 'http://localhost:3000/maintenance'

describe('Bicicleta.API', () => {

  beforeAll(function(done) {
    done();
  });

  afterEach(function(done) {
    done();
  });


  describe('Maintenance /Create-Delete', () => {
    it('Status 201', (done) => {
      const header = {'content-type': 'application/json'};
      const aData = {
          "dateTime": "2001-01-01T01:01:01",
          "carId": 1,
          "serviceList": [1, 2, 3]
      }

      request.post(
        {
          headers: header,
          url: base_url + '/v1',
          body: JSON.stringify(aData)
        }, function(error, response, body) {
            expect(response.statusCode).toBe(201);
            const recordset = JSON.parse(body).recordset;
            expect(recordset.length).toBe(3);

            const maintenanceId = recordset[0].maintenanceId;
            request.delete({
              url: base_url + '/v1/' + maintenanceId
            }, function(error, response, body) {
              expect(response.statusCode).toBe(202);
              const affectedRows = JSON.parse(body).affectedRows;
              expect(affectedRows).toBe(1);
              done();
            })
          })
      })
  });

});
