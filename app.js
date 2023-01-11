/*importation du package express framework système de routage
 et des fonctionnalités simplifiées*/
const express = require('express')
const app = express()
require('dotenv').config()
//importation du package body-parser
const bodyParser = require('body-parser');
//importe la route user.js
const userRoute = require('./route/user');
const sauceRoute = require('./route/sauce');
/*importation du package mongoose système de base de données
 non relationnelle open source et gratuit*/
 const mongoose = require('mongoose')
 const sauce = require('./models/sauce');
 //Le module Path permet de travailler avec des répertoires et des chemins de fichiers.
 const path = require('path');
 const port = process.env.PORT || 3000








/* CORS Il s'agit d'un système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents,
 Ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles.*/


  //middleware général appliqué à toute les routes
app.use((req, res, next) => {
  //l'origine qui a le droit d'accéder c'est tout le monde (*)

  res.setHeader('Access-Control-Allow-Origin', '*');
  //autorisation d'utiliser certain entête sur l'objet requête

  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //autorise certaine méthode

  //cela permet à l'application d'accéder à l'api sans problème

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   //next pour passer à l'exécution au middleware  d'après

  next();
});

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !'));
   

  

  app.use (bodyParser.json())
  app.use('/api/sauces', sauceRoute);
  app.use('/api/auth', userRoute);
  app.use('/images',express.static(path.join(__dirname, 'images')))


  module.exports = app;