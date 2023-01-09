/*importation du package express framework système de routage
 et des fonctionnalités simplifiées*/
const express = require('express')
const app = express()
//importation du package body-parser
const bodyParser = require('body-parser');
//importe la route user.js
const userRoute = require('./route/user');
/*importation du package mongoose système de base de données
 non relationnelle open source et gratuit*/
 const mongoose = require('mongoose')
 const sauce = require('./models/sauce');
 //Le module Path permet de travailler avec des répertoires et des chemins de fichiers.
 const path = require('path');
 const port = process.env.PORT || 3000
//definir umpoint

/*app.get ('/api/sauce/piment' , (req, res) => {
  res.send ('hello the world')
})*/







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


//nous lui passons un string, correspondant à la route
app.use('/api/sauce', (req, res, next) => {
  const sauce = [
    {
      _id: 'oeihfzeoi',
      title: 'kickin-pepper-sauce',
      description: 'sauce au poivre',
      imageUrl: 'https://Cass-kickin-ghost-pepper-sauce.jpg',
      likes:'',
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'sauce-piquante-de-la-mort',
      description: 'sauce rouge',
      imageUrl: 'https://sauce-piquante-rouge-mort-177ml-the-general-s.jpg',
      likes:'',
      userId: 'qsomihvqios',
    },
  ];
  /* Nous envoyons ensuite ces articles sous la forme de données JSON,
   avec un code 200 pour une demande réussie.*/
  res.status(200).json(sauce);
});

/*app.post('/api/sauce', (req, res, next) => {
  delete req.body._id;
  const sauce = new sauce({
    ...req.body
  });
  //La méthode save() renvoie une Promise
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) => {
  sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
});


app.get('/api/sauce', (req, res, next) => {
  sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
});*/

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

mongoose.connect("mongodb+srv://maryuser33:HmUAMxsv9YPI7SVZ@cluster0.ht52jvv.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !'));
   

  
  const sauceRoute = require('./route/sauce');
  app.use (bodyParser.json())
  app.use('/api/sauce', sauceRoute);
  app.use('/api/auth', userRoute);
  app.use('/images',express.static(path.join(__dirname, 'images')))


  module.exports = app;