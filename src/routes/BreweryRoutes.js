const express = require('express');
const router = express.Router();
const breweryController = require('../controllers/BreweryController');
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

router.post('/new-breweries', breweryController.createBrewery);
router.get('/', breweryController.getAllBreweries);
router.get('/:id', breweryController.getBreweryById);
router.put('/edit/:id', breweryController.updateBrewery);
router.delete('/remove/:id', breweryController.deleteBrewery);

module.exports = router;
