const express = require('express');
const router = express.Router();

router.post('/contact-messages', (req, res) => {
  const { name, lastname, email, message } = req.body;

  if (!name || !lastname || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  console.log('Received message:', req.body);

  // Mund ta ruash në databazë ose ta dërgosh me email
  return res.status(200).json({ message: 'Message received successfully' });
});

module.exports = router;
