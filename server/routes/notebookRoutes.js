const express = require('express');
const router = express.Router();

const notebookController = require('../controller/notebookController')

router.get('/notebook/cards/:notebookId', notebookController.getCards, (req, res) => {
  res.json(res.locals.cards)
});

// router.delete('/notebook/:notebookId')
// router.put('/notebook/:notebookId')

module.exports = router;
