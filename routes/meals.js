const express = require('express');

const { getAll, get, add, replace, remove } = require('../data/meal');
const {
  isValidText,
  isValidPrice,
  isValidImageUrl,
} = require('../util/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const meals = await getAll();
    setTimeout(() => {
      res.json({ meals: meals });
    }, setDelay);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const meal = await get(req.params.id);
    res.json({ meal: meal });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.name)) {
    errors.name = 'Invalid name.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidPrice(data.price)) {
    errors.price = 'Invalid price.';
  }

  if (!isValidText(data.cooking_description)) {
    errors.cooking_description = 'Cooking description.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Adding the meal failed due to validation errors.',
      errors,
    });
  }

  try {
    await add(data);

    setTimeout(() => {
      res.status(201).json({ message: 'meal saved.', meal: data });
    }, setDelay());
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.name)) {
    errors.name = 'Invalid name.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidPrice(data.price)) {
    errors.price = 'Invalid price.';
  }

  if (!isValidText(data.cooking_description)) {
    errors.cooking_description = 'Cooking description.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the meal failed due to validation errors.',
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: 'meal updated.', meal: data });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: 'meal deleted.' });
  } catch (error) {
    next(error);
  }
});

// Get a random number between 1 and 100 (70% of the time) and between 100 and 2000 (30% of the time).
function setDelay() {
  const rand = Math.random();
  if (rand < 0.7) {
    return Math.floor(Math.random() * 100) + 1;
  } else {
    return Math.floor(Math.random() * (2000 - 100 + 1)) + 100;
  }
}

module.exports = router;
