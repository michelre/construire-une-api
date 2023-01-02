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
const Sauce = require('./models/sauce');
//Le module Path permet de travailler avec des répertoires et des chemins de fichiers.
const path = require('path');

const port = process.env.PORT || 3000

//definir umpoint
app.get('/api/sauce/piment', (req, res) => {
    res.send('hello the world')
})
//midddelware general appliqué a toute les routes 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

mongoose.connect("mongodb+srv://maryuser33:HmUAMxsv9YPI7SVZ@cluster0.ht52jvv.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => {
        console.log('Connexion à MongoDB échouée !')
        console.log(err)
    });


const sauceRoutes = require('./route/sauce');
app.use(bodyParser.json())
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')))


module.exports = app;