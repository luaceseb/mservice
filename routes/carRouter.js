var express = require('express');
var router = express.Router();
var carCtrl = require('../controllers/carCtrl');

router.get('/v1/', carCtrl.carListAll);
router.get('/v1/owner/:id', carCtrl.carGetByOwnerId);
router.get('/v1/:id', carCtrl.carGetById);
router.post('/v1/', carCtrl.validData, carCtrl.carCreate); 
router.put('/v1/:id', carCtrl.validData, carCtrl.carUpdate);
router.delete('/v1/:id', carCtrl.carDelete);

module.exports = router;