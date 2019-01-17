const express = require('express');
const app = express();

app.get('/login', (req, res, next) => {
    next();
})

module.exports = app;