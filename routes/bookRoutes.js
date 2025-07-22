const express = require('express');
const { getBooks, addBook } = require('../controllers/bookController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/books', authenticateJWT, getBooks);
router.post('/books', authenticateJWT, addBook);

module.exports = router;
