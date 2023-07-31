const cards = require('express').Router();
const {
  getCards, createCard, deleteCard, addLikeCard, deleteLikeCard,
} = require('../controllers/cards');

cards.get('/', getCards);
cards.post('/', createCard);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', addLikeCard);
cards.delete('/:cardId/likes', deleteLikeCard);

module.exports = cards;
