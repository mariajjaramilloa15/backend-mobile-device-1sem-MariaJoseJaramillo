const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/reviews");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

router.post('/new-review', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.put('/edit/:id', reviewController.updateReview);
router.delete('/remove/:id', reviewController.deleteReview);

module.exports = router;
