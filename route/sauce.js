const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config')
const sauceCtrl = require('../controleurs/sauce');

//CRUD avec les chemins et les droits
router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//router.post('/:id/like', auth, sauceCtrl.creatlike);





/*router.post('/', (req, res, next) => {
  const sauce = new sauce({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'créé avec succés!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

router.get('/:id', (req, res, next) => {
  sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});

router.put('/:id', (req, res, next) => {
  const sauce = new sauce({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat
  });
  sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: ' sauce mise a jour avec succés!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

router.delete('/:id', (req, res, next) => {
  sauce.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'supprimé!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

router.get('/' +
  '', (req, res, next) => {
  sauce.find().then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

router.post('/:id/like', (req, res, next) => {
  const like = new like({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat
  });
  like.save().then(
    () => {
      res.status(201).json({
        message: 'ajout avec succés!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});*/

module.exports = router;