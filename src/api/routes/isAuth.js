const express = require('express');
const { Router } = express;

const isAuth = Router();

isAuth.get('/', (req, res) => {
    res.json({ message: 'ok' })
})

module.exports = isAuth