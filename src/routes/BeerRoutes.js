const express = require('express');
const router = express.Router();
const beerController = require('../controllers/BeerController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/beers");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

router.post('/new-beers', beerController.createBeer);
router.get('/', beerController.getAllBeers);
router.get('/:id', beerController.getBeerById);
router.put('/edit/:id', beerController.updateBeer);
router.delete('/remove/:id', beerController.deleteBeer);

module.exports = router;
