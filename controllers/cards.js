const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => res.send({ message: err }));
};

const createCard = (req, res) => {
  const {
    name, link,
  } = req.body;
  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => res.send({ message: err }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => res.send({ message: err }));
};

const addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => res.send({ message: err }));
};

const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => res.send({ message: err }));
};

module.exports = {
  getCards, createCard, deleteCard, addLikeCard, deleteLikeCard,
};
