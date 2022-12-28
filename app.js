//importation du package mongoose
const mongoose = require("mongoose")
//importation du package express
const express = require('express')
const app = express()
const port = 3000 
//importation du package body-parser
const bodyParser = require("body-parser");

//definir umpoint
app.get ('/api/sauce/piment' , (req, res) => {
  res.send ('hello the world')
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

mongoose.connect("mongodb+srv://maryuser33:HmUAMxsv9YPI7SVZ@cluster0.ht52jvv.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const stuffRoutes = require('./routes/stuff');
  app.use('/api/stuff', stuffRoutes);
