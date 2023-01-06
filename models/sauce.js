/*MongoDB est un système de gestion de base de données orienté documents
 permet d'associer et de stocker plusieurs types de données*/
const mongoose = require('mongoose');

//chaine de carractere (json)
const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  dislikes: { type: Number, required: true, default: 0 },
  likes: { type:Array, required: true,  },
  imageUrl: { type: String, required: true },

});

module.exports = mongoose.model('Sauce', sauceSchema);

