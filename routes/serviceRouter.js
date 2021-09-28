var express = require('express');
var router = express.Router();
var serviceCtrl = require('../controllers/serviceCtrl');

router.get('/v1/', serviceCtrl.serviceListAll);
router.get('/v1/:id', serviceCtrl.serviceGetById);
router.post('/v1/', serviceCtrl.validData, serviceCtrl.serviceCreate); 
router.put('/v1/:id', serviceCtrl.validData, serviceCtrl.serviceUpdate);
router.delete('/v1/:id', serviceCtrl.serviceDelete);

module.exports = router;