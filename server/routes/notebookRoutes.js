const express = require('express');
const router = express.Router();

const notebookController = require('../controller/notebookController');

router.get('/cards/:notebookId', notebookController.getCards, (req, res) => {
  res.json(res.locals.cards);
});

router.delete('/notebook/:notebookId', notebookController.removeNotebook, (req, res) => {
  res.json(res.locals.removed);
});
// router.put('/notebook/:notebookId')

module.exports = router;
