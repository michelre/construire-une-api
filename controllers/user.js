//importation du package token
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
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
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };
