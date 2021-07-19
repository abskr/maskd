import mongoose from 'mongoose';
import express from 'express';
// const { detectFace } = require('../middlewares/blazefaceMiddleware')
// const jwt = require("jsonwebtoken")
// const passport = require("passport")

// import middlewares
import { checkUser } from '../middlewares/authMiddleware.js';
import parser from '../middlewares/cloudinary/post.js';
// import imgClassifier from '../middlewares/imgClassifier.js'

// Load models
import User from '../../models/User.js';
import Post from '../../models/Post.js';

const router = express.Router();
// Load input validation
// NOT DONE

// @route GET api/posts
// @desc fetch all Post
// @access Private
router.get('/', checkUser, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort([['createdAt', -1]])
      .populate('author', 'username');
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// @route post api/posts
// @desc fetch all Post
// @access Private
router.post('/', checkUser, async (req, res) => {
  // console.log(req.author)
  // Check if user exists
  req.body.author = req.user._id;
  try {
    const post = new Post({
      text: req.body.text,
      author: req.body.author,
    });
    const newPost = await post.save();
    // console.log(newPost)
    res.status(200).send(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// @route post api/posts/:id
// @desc fetch a post by id
// @access Private
router.get('/:id', checkUser, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) res.sendStatus(404).send('Post not found!');
    else res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// router.put('/:id', checkUser, async (req, res) => {
//   const author = req.user._id
//   const postId = req.params._id
//   try {
//     const updatePost = {text: req.body.text}
//     const post = await Post.findOneAndUpdate({_id: postId, author: author}, updatePost, {new: true})
//     if (!post) res.send(404).send('post not found!')
//     // const {_id} = post
//     res.status(202).send(post)
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// })

// @route post api/posts/:id
// @desc fetch a post by id
// @access Private
router.delete('/:id', checkUser, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({ _id: postId, author: req.user._id });
    if (!post) {
      return res.status(404).send('Post not found!');
    }
    if (!req.user._id.equals(post.author)) {
      return res.status(403).send('Unauthorized!');
    } else {
      await Post.findOneAndDelete({ _id: postId, author: req.user._id });
      return res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// @route post api/posts/:id/upload
// @desc fetch a post by id
// @access Private
router.post(
  '/:id/upload',
  [checkUser, parser.single('postImg')],
  async (req, res) => {
    const postId = req.params.id;
    console.log(postId);
    try {
      const post = await Post.findById(postId);
      console.log(post === null);
      if (post === null) {
        if (!req.user._id.equals(post.author)) {
          return res
            .status(403)
            .json({ forbiddenerror: 'Action is not authorized!' });
        }
        return res.status(404).json({ postnotfound: 'Post not found!' });
      } else {
        console.log(req.file);
        const image = req.file && req.file.path;
        const postUpdate = await Post.findOneAndUpdate(
          { _id: postId, author: req.user._id },
          { $set: { image } },
          { runValidators: true, new: true }
        );
        res.status(201).json({ postUpdate });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

// @route post api/posts/:id/upvote
// @desc add author to upvote
// @access Private
router.post('/:id/upvote', checkUser, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send('Post not found!');
    }
    // const author = req.user._id
    const { votes } = post;
    const user = mongoose.Types.ObjectId(req.user._id);
    // console.log(votes.includes(author))
    const userLiked = votes.includes(user);
    if (userLiked) {
      await Post.findByIdAndUpdate(
        postId,
        { $pull: { votes: { $in: [user] } } },
        { new: true }
      );
      return res.status(202).send('upvote removed!');
    } else {
      await Post.findByIdAndUpdate(
        postId,
        { $push: { votes: user } },
        { new: true }
      );
      return res.status(202).send('upvote success!');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
