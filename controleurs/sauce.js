const Sauce = require('../models/sauce');
const fs = require('fs');
const {error} = require('console');

// appel avec requette,result,et nextpour passer au middelware d'apres
exports.getAllSauce = (req, res, next) => {
    Sauce.find()//demande a la base de donné avec find
        .then((sauces) => {//si ok avec find
            res.status(200).json(sauces);
        })
        .catch((error) => {//si error avec catch
            res.status(400).JSON({error});
        })
};

exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    delete sauceObjet._id;
    delete sauceObjet._userId;
    const sauce = new Sauce({
        ...sauceObjet,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
        .then(() => {
            res.status(201).json({message: 'Objet enregistré !'})
        })
        .catch(error => {
            res.status(400).json({error})
        })
};


exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};//definie le chemin avec le protocol http

    delete sauceObject._id;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'non autorisé'});
            } else {
                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: 'Objet modifié!'}))
                    .catch(error => res.status(401).json({error}));
            }
        })
        .catch((error) => {
            res.status(400).json({error});
        });
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'non autorisé'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];//suppression des images avec split
                fs.unlink(`images/${filename}`, () => {//suppression du fichier avec unlink
                    sauce.deleteOne({_id: req.params.id})
                        .then(() => {
                            res.status(200).json({message: 'Objet supprimé !'})
                        })
                        .catch(error => res.status(401).json({error}));
                });
            }
        })
        .catch(error => {
            res.status(500).json({error});
        });
};


exports.getOneSauce = (req, res, next) => {
    Sauce.findById(req.params.id).then((sauces) => {
        res.status(200).json(sauces)
    }).catch(err => {
        res.status(500).json(err)
    })
};


exports.likeOrDislikeSauce = (req, res) => {
    //requperation d'une seule sauce avec 'findone'
    Sauce.findOne({
        _id: req.params.id
    })
        .then(sauce => {
            //la personne n'aime pas la sauce
            if (req.body.like === -1) {
                sauce.dislikes++; //ajout dislikes
                sauce.usersDisliked.push(req.body.userId);//ajout de la personne + du dislike dans le tableau
            }
            //la personne aime la sauce
            if (req.body.like === 1) {
                sauce.likes++; //ajout likes
                sauce.usersLiked.push(req.body.userId);//ajout de la personne + du like dans le tableau
            }
            //la personne c'est trompé
            if (req.body.like === 0) {
                //ajout de conditions pour que le suppression du like soit attribué à id

                if (sauce.usersLiked.indexOf(req.body.userId) !== -1) {
                    sauce.likes--;//supression du like
                    sauce.usersLiked = sauce.usersLiked.filter(userId => userId !== req.body.userId)
                } else {
                    sauce.dislikes--;//supression du dislike
                    sauce.usersDisliked = sauce.usersDisliked.filter(userId => userId !== req.body.userId)
                }
            }

            sauce.save().then(() => {
                res.status(200).json({message: 'like pris en compte'})
            }).catch(error => {
                res.status(500).json({error})
            });
//réponse réussi
        })
};
