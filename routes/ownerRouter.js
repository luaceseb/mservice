var express = require('express');
var router = express.Router();
var ownerCtrl = require('../controllers/ownerCtrl');

router.get('/v1/', ownerCtrl.ownerListAll);
router.get('/v1/:id', ownerCtrl.ownerGetById);
router.post('/v1/', ownerCtrl.validData, ownerCtrl.ownerCreate); 
router.put('/v1/:id', ownerCtrl.validData, ownerCtrl.ownerUpdate);
router.delete('/v1/:id', ownerCtrl.ownerDelete);

module.exports = router;