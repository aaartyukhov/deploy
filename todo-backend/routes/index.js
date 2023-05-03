const router = require('express').Router();

const cardRouter = require('./cards');

router.use('/cards', cardRouter);
router.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
});

module.exports = router;
