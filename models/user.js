const mongoose = require("mongoose");
//plugin qui evite les doubles utilisateurs
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    email: { type: 'string', required: true , },
    password :{type:'string' ,required :true}
});

//userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User' ,userSchema);