const express = require('express');
const { getGamePrices } = require('../controllers/priceController');

const router = express.Router();
router.get('/:gameName', getGamePrices);

module.exports = router;
