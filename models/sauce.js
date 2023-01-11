/*MongoDB est un système de gestion de base de données orienté documents
 permet d'associer et de stocker plusieurs types de données*/
const mongoose = require('mongoose');

//chaine de carractere (json)
const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true,  default: 0},
  dislikes: { type: Number, required: true, default: 0 },
  usersLiked: { type: Array, required: true,  default: []},
  usersDisliked: { type: Array, required: true,  default: []},
});

module.exports = mongoose.model('Sauce', sauceSchema);

