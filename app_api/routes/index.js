const express = require('express');
const tripsController = require('../controllers/trips');

const router = express.Router();

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);
router.post('/trips', tripsController.tripsAddTrip);
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', tripsController.tripsDeleteTrip);

module.exports = router;
