const sauce = require ('../models/sauce');
const fs = require ('fs');
const { error } = require('console');

// appel avec requette,result,et nextpour passer au middelware d'apres
exports.getAllsauce = (req,res,next) => {
    sauce.find()//demande a la base de donné avec find
    .then((sauce) =>{//si ok avec find
        res.status (200).json(sauce);
    })
    .catch((error) =>{//si error avec catch
        res.status (400).JSON({error});
    })
};

exports.createSauce = (req, res, next) =>{
    const sauceObjet = json.parse (req, body ,sauce);
    delete sauceObjet._id;
    delete sauceObjet._userId;
    const sauce = new sauce ({
        ...sauceObjet,
        userId: req.auth.userId,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

sauce.save()
   .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
   .catch(error => { res.status(400).json( { error })})
};


exports.modifysauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };//definie le chemin avec le protocol http
  
    deletesauceObject._userId;
    sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'non autorisé'});
            } else {
                sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

 exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(thing => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = thing.imageUrl.split('/images/')[1];//suppression des images avec split
                fs.unlink(`images/${filename}`, () => {//suppression du fichier avec unlink
                    Thing.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };



 exports.getOne =(req, res, next) =>{
    Sauce.findById(req.params.id).then((sauces) => {
        res.status(200).json(sauces)
    }).catch(err => {
        res.status(500).json(err)
    })
};


exports.createLike = (req , res) => {
    //requperation d'une seule sauce avec 'findone'
    Sauce.findOne({
        _id:req.param.id
    })
    .then (sauce =>{
        //la personne n'aime pas la sauce
        if(req.body.like == -1){
            sauce.dislikes++; //ajout dislikes
            sauce.usersLiked.push(req.body.userId);//ajout de la personne + du dislike dans le tableau
            sauce.save();
        }
        //la personne aime la sauce
        if(req.body.like == 1){
            sauce.likes++; //ajout likes
            sauce.usersLiked.push(req.body.userId);//ajout de la personne + du like dans le tableau
            sauce.save();
        }
    })
};

//la personne c'est trompé
if(req.body.like == 0){
    //ajout de conditions pour que le suppression du like soit attribué à id

    if (sauce.userLiked.indexOff(req.body.userId)!== -1 ){
        sauce.likes--;//supression du like
        sauce .userId.splices(sauce.userLiked.indexOff(req.body.useId), 1);//suppression en fonction du iD
    } else {
        sauce.dislikes--;//supression du dislike
        sauce .userDisliked.splices(sauce.userDisLiked.indexOff(req.body.useId), 1);//suppression en fonction du iD
    }
   sauce.save(); 
}

//réponse réussi
res.status,(200).json({message:'like pris en compte'})
.catch(error =>{
    res.status(500).json({error})
});