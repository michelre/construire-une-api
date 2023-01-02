//importe notre fonction jsonWebtoken

const jwt = require('jsonwebtoken');
//exporte notre midellware
module.exports = (req, res, next) =>{
//gere les erreur avec un try / catch
try {
  //recupere le token le hearder et la spliter(diviser la chaine de carractere en un tableau)
  const token = req.headers.authorization.split(' ')[1];
  //decode avec la methode verify 
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  //recupere userId 
  const userId = decodedToken.userId;
  //transmet au route par la suite 
  req.auth = {
    userId:userId
  };
  next()
} catch (error) {
  res.status (401).json({error});  
}

};