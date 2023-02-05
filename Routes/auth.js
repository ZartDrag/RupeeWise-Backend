const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");

//to register a new user
router.post(
  "/register",

  // username must be an email
  body("username", "Enter a valid email address").isEmail(),
  // password must be at least 6 chars long
  body("password", "Password must be 6 characters long").isLength({ min: 6 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {//check if the email already exists in the db
        let user = await User.findOne({username : req.body.username});

        if(user)
            return res.status(400).json({error : "The user with this email already exists"});    

        user = await User.create({       //each field must be passed into the User model after validation
            username: req.body.username,
            password: req.body.password,
            contact: req.body.contact,
            members: req.body.members
        });

        res.json({"Success" : "User added successfully"});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error encountered");
    }
    
  }
);

module.exports = router;
