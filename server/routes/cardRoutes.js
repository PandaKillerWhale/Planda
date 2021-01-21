const express = require('express');
const router = express.Router();

const cardController = require('../controller/cardController.js');

router.post('/', cardController.postCard, (req, res) => {
  res.json(res.locals.newCard);
});

router.patch('/', cardController.updateCard, (req, res) => {
  res.json(res.locals.updateCard);
});


router.delete('/', cardController.deleteCard, (req, res) => {
  res.json(res.locals.deletedCard);
})



module.exports = router;
