const express = require('express');
const router = express.Router();
const auth = require('../middelware/auth');
const multer = require ('../middelware/multer-config')
const sauceCtrl = require('../controllers/sauce');


router.get('/', auth, sauceCtrl.getAll);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOne);
/*router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);*/

module.exports = router;