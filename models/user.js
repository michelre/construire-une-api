const mongoose = require("mongoose");
//plugin qui evite les doubles utilisateurs
const uniqueValidator = require('mongoose-unique-validator');
const userShema = mongoose.Shema({
    email: { type: 'string', required: true , unique: true},
    password :{type:'string' ,required :true}
});

userShema.plugin(uniqueValidator);


module.exports = mongoose.model('user' ,userShema);