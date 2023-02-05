const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWTsecret = "SomeGoodJWTSecretString";
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

        const salt = await bcrypt.genSalt(10);    //adding salt to the password to encrypt it
        const secretPass = await bcrypt.hash(req.body.password, salt);
        //converting the password into a hash code to increase security

        user = await User.create({       //each field must be passed into the User model after validation
            username: req.body.username,
            password: secretPass,
            contact: req.body.contact,
            members: req.body.members
        });

        const data = {
            user  :{
                id : user.id
            }
        }
        const authToken = jwt.sign(data, JWTsecret);
        //return an authentication token so the user can avoid logging in again and again

        // res.json({"Success" : "User added successfully"});
        res.json({authToken});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error encountered");
    }
    
  }
);

module.exports = router;
