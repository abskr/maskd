import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
// const keys from "../../config/keys");
import passport from "passport"

// Load input validation
import validateRegisterInput from "../../validation/register.js"
import validateLoginInput from "../../validation/login.js"

// Load middleware
import {checkUser} from "../middlewares/authMiddleware.js"

// Load User model
import User from "../../models/User.js"

const router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      const newUser = new User({
        age: req.body.age,
        username: req.body.username,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  // Find user by username
  User.findOne({ username }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernamenotfound: "Username not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
            id: user.id,
            username: user.username,
            followers: user.followers,
            following: user.following,
            age: user.age
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 86400 // 24 hours in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.get("/me", checkUser, async (req, res) => {
  try{
    const {user} = req
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
});

export default router
