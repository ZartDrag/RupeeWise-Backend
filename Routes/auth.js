const express = require('express');
const router = express.Router();
const User = require("../models/Users");

router.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    obj = req.body;
    console.log(user);
    res.send(req.body);
});

module.exports = router;