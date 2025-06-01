const express = require('express');
const router = express.Router();
const { loginEmail, loginGoogle } = require('../controllers/authController');

router.post('/login', loginEmail);
router.post('/google', loginGoogle);

module.exports = router;
