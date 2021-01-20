const express = require('express');
const router = express.Router();

const cardController = require('../controller/cardController.js');

router.post('/', cardController.postCard, (req, res) => {
  res.json(res.locals.newCard);
});

// router.delete('/card');
// router.put('/card');

module.exports = router;
