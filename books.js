require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bookRoutes);

app.listen(4000, () => {
    console.log('Books service started on port 4000');
});