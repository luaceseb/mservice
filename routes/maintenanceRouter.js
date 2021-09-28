var express = require('express');
var router = express.Router();
var maintenanceCtrl = require('../controllers/maintenanceCtrl');

router.get('/v1/', maintenanceCtrl.maintenanceListAll);
router.get('/v1/car/:id', maintenanceCtrl.maintenanceGetByCarId);
router.get('/v1/:id', maintenanceCtrl.maintenanceGetById);
router.post('/v1/', maintenanceCtrl.validData, maintenanceCtrl.maintenanceCreate); 
router.delete('/v1/:id', maintenanceCtrl.maintenanceDelete);

module.exports = router;