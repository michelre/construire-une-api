//création d'un routeur avec express
const express = require('express');
const router = express.Router();
//associer les fonctions aux différentes routes
const userCtrl = require('../controleurs/user');
//frontend envoie des information adresse mail et mot de pass
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//exporte le router pour l'importer dans app.js
module.exports = router;