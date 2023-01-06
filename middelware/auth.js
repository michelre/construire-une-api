//importe notre fonction json Web token
const jwt = require('jsonwebtoken');
//exporte notre middleware
module.exports = (req, res, next) =>{
//gere les erreurs avec un try / catch
try {
  //recupére le token le hearder et la spliter(diviser la chaine de caractere en un tableau)
  const token = req.headers.authorization.split(' ')[1];
  //decode avec la methode verify 
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  //recupere userId 
  const userId = decodedToken.userId;
  //transmet au route par la suite 
  req.auth = {
    userId:userId
  }; 
} catch (error) {
  res.status (401).json({error});  
}

};