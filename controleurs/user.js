const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/User');

// on déclare une fonction signup pour enregistrer nos utilisateurs
exports.signup = (req, res, next) => {
//haché(cripter) le mot de pass en 10 tours pour pas ralentir le router en methode assincronne 
bcrypt.hash(req.body.password ,10)
.then(hash =>{
    /*prendre mot de pass cripté et créé un nouveau user avec mot de pass cripté(hash)et
     passé dans le corp(body) de la requette*/
    const user = new User ({
        email: req.body.email,
        password : hash
    });
    //enregistre avec save dans la base de donné
    user.save()
    // renvoie un 201 pour une création de ressource
    .then(() => (res.status(201).json)({message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({error}));
})
.catch(error => res.status(500).json({error}));
};
//on déclare une fonction login pour connecter nos utilisateurs
exports.login = (req, res, next) => {

};






//importation du package token créé et modifie les tokens
const jwt = require('jsonwebtoken');
/*on utilise la methose findOne et on lui passe un filtre(email)
et la valeur transmise par le client*/
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    //geré 2 cas (car c'est une prommesse géré par findOne) (then)quand elle reussi
        .then(user => {
            //if(user === nul)
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            //compare mot de pass de la base de donné avec celui qui nous a etait transmit
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !'});
                    }
                    /* sing() une clé secrète pour chiffrer un token qui peut contenir
                     un payload personnalisé et avoir une validité limitée.*/
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            //Nous utilisons une chaîne secrète  pour crypter notre token
                            'RANDOM_TOKEN_SECRET',
                            //Nous définissons la durée de validité du token à 24 heures.
                            // L'utilisateur devra donc se reconnecter au bout de 24 heures.
                            { expiresIn: '24h' }
                        )
                    });
                })
                /*cas catch lors d'une erreur 
                (ici d'execution de requette dans la base de donnée)
                erreur 500 erreur serveur*/

                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };
