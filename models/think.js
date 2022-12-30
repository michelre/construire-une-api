const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  userId: { type: String, required: true },
  dislikes: { type: Number, required: true },
  //imageUrl: { type: String, required: true },
  dislikedBy: { type: Array, required: true },
  
});

module.exports = mongoose.model('thing', sauceSchema);