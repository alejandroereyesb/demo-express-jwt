const express = require('express');
const { login, token, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/token', token);
router.post('/logout', logout);

module.exports = router;
