const express = require('express');
const app = express ();
module.exports = app ;
app.use ((req, res)=>{
    res.json ({'votre requêtte a bien été reçu'});
});
module.exports = app;
