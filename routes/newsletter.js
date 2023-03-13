const express = require('express');
const { isValidEmail } = require('../util/validation');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!isValidEmail(email)) {
    return res.status(422).json({
      message: 'Invalid email address provided.',
    });
  }

  // TODO: Send newsletter email using provided email address.

  res.json({
    message: `Thank you for subscribing to our newsletter, ${email}!`,
  });
});

module.exports = router;
