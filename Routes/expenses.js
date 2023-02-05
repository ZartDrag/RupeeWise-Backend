const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = ["You tried to fetch expenses"];
    res.json(obj);
});

module.exports = router;