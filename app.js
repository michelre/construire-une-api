/*importation du package express framework système de routage
 et des fonctionnalités simplifiées*/
const express = require('express')
const app = express()
//importation du package body-parser
const bodyParser = require('body-parser');
//importe la route user.js
const userRoutes = require('./route/user');
/*importation du package mongoose système de base de données
 non relationnelle open source et gratuit*/
 const mongoose = require('mongoose')
 const Thing = require('./models/thing');
 //Le module Path permet de travailler avec des répertoires et des chemins de fichiers.
 const path = require('path');
//definir umpoint
app.get ('/api/sauce/piment' , (req, res) => {
  res.send ('hello the world')
})
//midddelware general appliqué a toute les routes 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});


app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

mongoose.connect("mongodb+srv://maryuser33:HmUAMxsv9YPI7SVZ@cluster0.ht52jvv.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
   

  
  const stuffRoutes = require('./routes/stuff');
  app.use (bodyParser.json())
  app.use('/api/stuff', stuffRoutes);
  app.use('/api/auth',userRoutes);
  app.use('/images',express.static(path.join(__dirname, 'images')))


  module.exports = app;