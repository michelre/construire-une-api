const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  dislikes: { type: Number, required: true, default: 0 },
  likes: { type: Number, required: true, default: 0 },
  imageUrl: { type: String, required: true },
  
});

module.exports = mongoose.model('Sauce', sauceSchema);