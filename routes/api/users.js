import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// const keys from "../../config/keys");
import passport from 'passport';

// Load input validation
import validateRegisterInput from '../../validation/register.js';
import validateLoginInput from '../../validation/login.js';

// Load middleware
import { checkUser } from '../middlewares/authMiddleware.js';

// Load User model
import User from '../../models/User.js';
import Following from '../../models/Following.js';
import Post from '../../models/Post.js'

const router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      return res.status(400).json({ username: 'Username already exists' });
    } else {
      const newUser = new User({
        age: req.body.age,
        username: req.body.username,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          // if (err) throw err;
          // newUser.password = hash;
          // newUser
          //   .save()
          //   .then(user => {
          //     console.log(user)
          //     res.json(user)
          //   })
          //   .catch(err => console.log(err));
          try {
            if (err) throw err;
            newUser.password = hash;
            const user = await newUser.save();
            const newFollowing = new Following({
              userId: user._id,
            });
            const uFollowing = await newFollowing.save();
            res.json({ user, uFollowing });
          } catch (err) {
            console.log(err);
          }
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  // Find user by username
  User.findOne({ username }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernamenotfound: 'Username not found' });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
          age: user.age,
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 86400, // 24 hours in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

// @route GET api/users/:userId
// @desc fetch other other userId
// @access Private
router.get('/me', checkUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId, '-password');
    if (!user) res.send(404).send('user not found!');
    const following = await Following.findOne({ userId: user._id})
    const userObjId = mongoose.Types.ObjectId(user._id)
    const followers = await Following.find({ uFollowing: userObjId})
    res.status(200).json({user, following, followers});
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// @route GET api/users/:userId
// @desc fetch other other userId
// @access Private
router.get('/:username', checkUser, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username }, '-password');
    if (!user) res.send(404).send('user not found!');
    const following = await Following.findOne({ userId: user._id})
    const userObjId = mongoose.Types.ObjectId(user._id)
    const followers = await Following.find({ uFollowing: userObjId})
    res.status(200).json({user, following, followers});
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// @route POST api/users/:userId/follow
// @desc follow the user defied in the param
// @access Private
router.post('/:userId/ff', checkUser, async (req, res) => {
  try {
    // find the user
    const userToFollow = await User.findById(req.params.userId);
    if (!userToFollow) res.send(404).send('user not found!');

    // find and check followingList
    const followingList = await Following.findOne({ userId: req.user._id });
    const { uFollowing, _id } = followingList;
    const uToFollowObjId = mongoose.Types.ObjectId(req.params.userId);
    const userObjId = mongoose.Types.ObjectId(req.user._id);
    const userFollowed = uFollowing.includes(req.params.userId);
    console.log(uToFollowObjId)
    console.log(userObjId)
    console.log(userFollowed);
    if (userFollowed) {
      const update = await Following.findByIdAndUpdate(
        _id,
        {
          $pull: { uFollowing: { $in: [uToFollowObjId] } },
        },
        { new: true }
      );
      console.log(update);
      return res.status(202).send('unfollowed');
    } else {
      const update = await Following.findByIdAndUpdate(
        _id,
        {
          $push: { uFollowing: uToFollowObjId },
        },
        { new: true }
      );
      console.log(update);
      return res.status(202).send('followed');
    }
    // res.send()
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// @route post api/:userId/posts
// @desc get posts from a user
// @access Private
router.get('/:userId/posts', checkUser, async (req, res) => {
  try {
    const uPosts = await Post.find({author : req.params.userId})
    if (!uPosts) {
      res.send("No posts from this account yet!")
    }
    res.send(uPosts)
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
