const Sauce = require('../models/sauce');
const fs = require('fs');

// C - CREATE
// R - READ
// U - UPDATE
// D - DELETE

exports.getAll = (req, res) => {
    Sauce.find({}).then((sauces) => {
        res.status(200).json(sauces)
    }).catch(err => {
        res.status(500).json(err)
    })
}

exports.createSauce = (req, res, next) => {
    const sauceObject = req.body;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
        .then(() => {
            res.status(201).json({message: 'Sauce enregistrée !'})
        })
        .catch(error => {
            res.status(400).json({error})
        })
};


exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    delete thingObject._userId;
    Thing.findOne({_id: req.params.id})
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                Thing.updateOne({_id: req.params.id}, {...thingObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: 'Objet modifié!'}))
                    .catch(error => res.status(401).json({error}));
            }
        })
        .catch((error) => {
            res.status(400).json({error});
        });
};

exports.deleteThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then(thing => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = thing.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Thing.deleteOne({_id: req.params.id})
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


exports.getOne =(req, res, next) =>{
    Sauce.findById(req.params.id).then((sauces) => {
        res.status(200).json(sauces)
    }).catch(err => {
        res.status(500).json(err)
    })
}