//imporation de multer gerer les fichiers images..
const multer = require ('multer');

const  MYME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png':'png'
};
//objet de configuration  et on va l'appeler disk storage = enregistrement sur le disque 
const storage = multer.diskStorage({
    destination: (req, File, callback) =>{
        //pas d'erreur et nom du dossier
    callback (null,'images')
    },
    //filname evite les même nom
    filname: (req, file, callback) =>{
        //nouveau nom split: autour des espace et join utilise les underscores
        const name = file.originalname.split (' ').join('_');
        //genere les extentions (qui sont un objets)
        const extention = MYNE_TYPES [file.minetypes];
        //date.nom: est un time snipe 
    callback (null, name + Date.now() + '.' + extention);
    }
});
//exporte /appel multer/on passe storage /fichier unique /et dossier image
module.exports = multer({storage}).single('image');