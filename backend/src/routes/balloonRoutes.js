const express = require('express');
const router = express.Router();
const balloonController = require('../controllers/balloonController');


router.get('/', balloonController.getAllBalloons);


router.get('/:id', balloonController.getBalloonById);


router.post('/', balloonController.createBalloon);


router.patch('/:id', balloonController.updateBalloon);


router.delete('/:id', balloonController.deleteBalloon);

module.exports = router;
