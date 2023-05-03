const Card = require('../models/card');

// GET /cards
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `${err}` }));
};

// POST /cards
const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      res.status(500).send({ message: `${err}` });
    });
};

module.exports = {
  getCards,
  createCard,
};
